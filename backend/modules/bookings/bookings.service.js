import mongoose from "mongoose";
import { Booking } from "../../models/Booking.model.js";
import { PaymentTransaction } from "../../models/PaymentTransaction.model.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../../errors/Http.error.js";
import { MODELS } from "../../constants/models.constants.js";
import { PAYABLE_TYPE, PAYMENT_STATUS } from "../../constants/payment.constants.js";
import { BOOKING_STATUS } from "../../constants/booking.constants.js";
import { releaseWalletEarning } from "../finance/wallet/wallet.service.js";
import { Service } from "../../models/Service.model.js"
import { createCheckoutURL } from "../../utils/payment.utils.js";
import { v4 as uuidv4 } from "uuid"

export const createBooking = async ({
  booker,
  service:serviceId,
  description,
  scheduledAt,
  durationMinutes,
  price,
  notes,
}) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bookingTime = new Date(scheduledAt);

    if (Number.isNaN(bookingTime.getTime())) {
      throw new BadRequestError("Invalid booking time");
    }

    if (bookingTime < new Date()) {
      throw new BadRequestError("Cannot book in the past");
    }

    const service = await Service.findById(serviceId);

    if(!service){
      throw new NotFoundError("Service Doesn't exist");
    }

    const conflict = await Booking.findOne({
      service:service._id,
      scheduledAt: bookingTime,
      status: BOOKING_STATUS.ACCEPTED,
    }).session(session);

    const provider = service.provider;

    if (conflict) {
      throw new BadRequestError("Time slot already booked");
    }

    const bookingArr = await Booking.create(
      [
        {
          booker,
          service:serviceId,
          provider,
          description,
          scheduledAt: bookingTime,
          durationMinutes,
          price,
          notes,
          status: BOOKING_STATUS.REQUESTED,
        },
      ],
      { session }
    );

    const booking = bookingArr[0];

    const paymentArr = await PaymentTransaction.create(
      [
        {
          buyer: booker,
          payableType: PAYABLE_TYPE.BOOKING,
          payableId: booking._id,
          amount: price,
          status: PAYMENT_STATUS.PENDING,
        },
      ],
      { session }
    );

    const payment = paymentArr[0];

    booking.paymentTransaction = payment._id;

    await booking.save({ session });

    await session.commitTransaction();

    return { booking, payment };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};


export const getMyBookings = async ({
  booker,
  provider,
  page = 1,
  limit = 10,
  status,
  service,
}) => {

  const query = {
    $or:
    [
      {
        booker
      },
      {
        provider
      }
    ]
  };

  if (status) {
    query.status = status;
  }

  if (service) {
    query.service = service;
  }

  return Booking.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("booker", "name email")
    .populate({
      path: "service",
      select: "name provider",
      populate: {
        path: "provider",
        select: "name",
      },
    })
    .populate("paymentTransaction");
};


export const getBookingById = async ({
  bookingId,
  user,
}) => {

  const booking = await Booking.findById(bookingId)
    .populate("booker", "name email")
    .populate("paymentTransaction");

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  const isBooker =
    booking.booker.toString() === user?.id?.toString();

  const isProvider =
    booking.provider?.toString() ===
    user.provider.toString();

  if (!isBooker && !isProvider) {
    throw new ForbiddenError("Access denied");
  }

  return booking;
};

export const completeBooking = async({booker, bookingId}) =>{
  const booking = await Booking.findById(bookingId).populate({
    path:"provider",
    select:"user"
  });
  if(!booking)
    throw new NotFoundError("booking not found")
  if(booking.booker.toString() !== booker)
    throw new NotFoundError("only relevant booker can complete a booking");
  if(booking.status !== BOOKING_STATUS.PAYED)
    throw new BadRequestError("cannot complete booking with given status")
  booking.status = BOOKING_STATUS.COMPLETED;
  await releaseWalletEarning({
    userId: booking.provider.user,
    amount: booking.price,
    referenceId: booking._id,
    referenceModel: MODELS.BOOKING,
  });
  await booking.save();
  return booking;
}

export const cancelBooking = async ({
  bookingId,
  booker,
  provider
}) => {

  const booking = await Booking.findById(bookingId);
  if (!booking) 
    throw new NotFoundError("Booking not found")
  const isBooker = booking.booker.toString() === booker.toString();
  const isProvider = booking.provider?.toString() === provider.toString();
  if (!isBooker && !isProvider) 
    throw new ForbiddenError("Not allowed")
  if (booking.status === BOOKING_STATUS.COMPLETED) 
    throw new BadRequestError("Cannot cancel completed booking")
  booking.status = BOOKING_STATUS.CANCELLED;
  await booking.save();
  return booking;
};


export const acceptBooking = async ({
  bookingId,
  provider
}) => {
  const booking = await Booking.findById(bookingId);
  if(!booking)
    throw new NotFoundError("booking not found");
  if(booking.provider.toString() !== provider)
    throw new BadRequestError("only relevant provider can accept a booking");
  if(booking.status !== BOOKING_STATUS.REQUESTED)
    throw new BadRequestError("cannot accept booking with given status");
  booking.status = BOOKING_STATUS.ACCEPTED;
  await booking.save();
  return booking;
}

export const payBooking = async ({
  bookingId,
  booker
}) => {
  const booking = await Booking.findById(bookingId);
  if(!booking)
    throw new NotFoundError("booking not found");
  if(booking.booker.toString() !== booker)
    throw new BadRequestError("only relevant booker can pay");
  if(booking.status !== BOOKING_STATUS.ACCEPTED)
    throw new BadRequestError("only accepted bookings can be paid for");
  const paymentTransaction = await PaymentTransaction.findById(booking.paymentTransaction);
  booking.paymentTransaction = paymentTransaction._id;
  await booking.save();
  const metaData = JSON.stringify({payableType:PAYABLE_TYPE.BOOKING,payableId:booking._id?.toString()});
  const {url:checkoutURL,token} = await createCheckoutURL({
      orderId: metaData,
      amount: booking.price,
  });
  paymentTransaction.gatewayData = {
    trackerToken: token,
    checkoutURL,
    state: "TRACKER_STARTED",
  };
  await paymentTransaction.save();
  return({
    paymentTransaction,
    booking,
    checkoutURL
  })
}

export const deleteBooking = async ({
  bookingId,
  booker,
  provider
}) => {
  const booking = await Booking.findById(bookingId);
  if (!booking)
    throw new NotFoundError("Booking not found")
  const isBooker = booking.booker === booker;
  const isProvider = booking.provider === provider;
  if (!isBooker || !isProvider)
    throw new ForbiddenError("only relevant booker or provider can delete booking");
  if(booking.status === BOOKING_STATUS.PAYED)
    throw new BadRequestError("cannot cancel a payed booking");
  await booking.deleteOne();
  return true;
}