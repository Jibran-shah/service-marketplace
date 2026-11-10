import * as bookingsService from "./bookings.service.js";

export const createBooking = async (req, res) => {
  const result = await bookingsService.createBooking({
    booker: req.user.id,
    ...req.validated?.body
  });

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: result
  });
};


export const getMyBookings = async (req, res) => {
  const bookings = await bookingsService.getMyBookings({
    booker: req.user.id,
    provider:req.user.provider,
    ...req.validated.query
  });

  res.status(200).json({
    success: true,
    message: "Bookings fetched successfully",
    data: {bookings}
  });
};

export const getBookingById = async (req, res) => {
  const result = await bookingsService.getBookingById({
    bookingId: req.validated.params.bookingId,
    user: req.user.id
  });

  res.status(200).json({
    success: true,
    message: "Booking fetched successfully",
    data: result
  });
};


export const payBooking = async (req, res) => {
  const params = req.validated?.params
  const result = await bookingsService.payBooking({
    bookingId:params?.bookingId,
    booker:req.user.id
  })

  res.status(200).json({
    success:true,
    data:{
      ...result
    }
  })
}

export const acceptBooking = async (req, res) => {
  const booking = await bookingsService.acceptBooking({
    bookingId:req.validated.params.bookingId,
    provider:req.user.provider
  })

  res.status(200).json({
    success:true,
    data:{
      booking
    }
  })
}

export const completeBooking = async (req, res) => {
  const booking = await bookingsService.completeBooking({
    bookingId:req.validated.params.bookingId,
    booker:req.user.id
  })

  res.status(200).json({
    success:true,
    data:{
      booking
    }
  })
}

export const cancelBooking = async (req, res) => {
  const result = await bookingsService.cancelBooking({
    bookingId: req.validated.params.bookingId,
    booker: req.user.id,
    provider: req.user.provider
  });

  res.status(200).json({
    success: true,
    message: "Booking cancelled successfully",
    data: result
  });
};

export const deleteBooking = async (req, res) => {
  const result = await bookingsService.deleteBooking({
    bookingId: req.validated.params.bookingId,
    booker: req.user.id
  });

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
    data: result
  });
};