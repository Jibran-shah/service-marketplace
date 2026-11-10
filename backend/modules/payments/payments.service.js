import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { PaymentTransaction } from "../../models/PaymentTransaction.model.js";
import { Booking } from "../../models/Booking.model.js";
import { Provider } from "../../models/Provider.model.js";
import { WalletTransaction } from "../../models/WalletTransaction.model.js";
import { getOrCreateWallet } from "../finance/wallet/wallet.service.js";
import { PAYMENT_STATUS, PAYABLE_TYPE } from "../../constants/payment.constants.js";
import { WALLET_TRANSACTION_STATUS, WALLET_TRANSACTION_TYPE } from "../../constants/wallet.constants.js";
import { BOOKING_STATUS } from "../../constants/booking.constants.js";
import { MODELS } from "../../constants/models.constants.js";
import { BadRequestError, InternalServerError } from "../../errors/Http.error.js";
import { processRefund } from "../../utils/payment.utils.js"

export const createPaymentTransaction = async ({
  buyerId,
  amount,
  payableType,
  payableId,
  provider,
  idempotencyKey,
}) => {
  const existing = idempotencyKey
    ? await PaymentTransaction.findOne({
        buyer: buyerId,
        idempotencyKey,
      })
    : null;

  if (existing) return existing;

  return PaymentTransaction.create({
    buyer: buyerId,
    amount,
    provider,
    payableType,
    payableId,
    status: PAYMENT_STATUS.PENDING,
    transactionId: uuidv4(),
    idempotencyKey: idempotencyKey || null,
  });
};

export const getMyPaymentTransactions = async ({
  buyerId,
  page = 1,
  limit = 20,
}) => {
  page = Math.max(Number(page), 1);
  limit = Math.min(Math.max(Number(limit), 1), 100);

  const [data, total] = await Promise.all([
    PaymentTransaction.find({ buyer: buyerId })
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit),

    PaymentTransaction.countDocuments({ buyer: buyerId }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  };
};

export const getPaymentTransactionById = async ({
  transactionId,
  buyerId,
}) => {
  const transaction = await PaymentTransaction.findOne({
    _id: transactionId,
    buyer: buyerId,
  });

  if (!transaction) {
    throw new Error("Payment transaction not found");
  }

  return transaction;
};

export const processSafePayWebhook = async ({
  payload,
}) => {
  const data = payload?.data;
  if (!data)
    throw new BadRequestError("Invalid payload");
  const trackerToken = data.notification?.tracker;
  const state = data?.notification?.state;
  let status = "pending";
  if (state === "TRACKER_ENDED" || state === "PAID")
    status = "success";
  else if (state === "FAILED" || state === "CANCELLED")
    status = "failed";

  const {payableType,payableId} = JSON.parse(data.notification?.metadata?.order_id)

  console.log("payable type payable id",payableType,payableId);

  await handlePaymentWebhook({
    payableType,
    payableId,
    status,
    raw: payload
  });
  return { received: true };
};

export const handlePaymentWebhook = async ({
  payableType,
  payableId,
  status,
  raw
}) => {

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const transaction = await PaymentTransaction.findOne({payableType,payableId}).session(session);
    console.log("transaction",transaction)
    if (!transaction) {
      throw new Error("Payment transaction not found");
    }
    transaction.status = "ended"
    const newStatus = status.toLowerCase();
    if (transaction.status === newStatus) {
      await session.commitTransaction();
      return transaction;
    }
    transaction.status = newStatus;
    transaction.gatewayData = {
      ...transaction.gatewayData,
      response: raw
    };
    console.log("new status", newStatus);
    if (newStatus === "success") {
      await handleSuccess(transaction, session);
    }
    if (newStatus === "failed") {
      await handleFailed(transaction, session);
    }
    if (newStatus === "refunded") {
      await handleRefund(transaction, session);
    }
    await transaction.save({ session });
    await session.commitTransaction();
    return transaction;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
const handleSuccess = async (transaction, session) => {
  console.log("PAYMENT SUCCESS:", transaction);
  console.log("PAYABLE TYPE:", transaction.payableType);
  console.log("PAYABLE ID:", transaction.payableId);

  if (transaction.payableType === PAYABLE_TYPE.ORDER) {
      console.log("ORDER PAYMENT BRANCH");

      const buyerOrder = await BuyerOrder.findById(
        transaction.payableId
      ).session(session);

      console.log("BUYER ORDER:", buyerOrder);

      if (!buyerOrder) {
        console.log("BUYER ORDER NOT FOUND");
        return;
      }

      console.log("BUYER ORDER STATUS:", buyerOrder.status);

      if (buyerOrder.status === BUYER_ORDER_STATUS.PAID) {
        console.log("BUYER ORDER ALREADY PAID");
        return;
      }

      buyerOrder.status = BUYER_ORDER_STATUS.PAID;

      await buyerOrder.save({ session });

      console.log("BUYER ORDER MARKED PAID");

      const shopOrders =
        await createShopOrdersFromBuyerOrder({
          buyerOrder,
          paymentTransaction: transaction._id,
          session,
        });

      console.log("SHOP ORDERS CREATED:", shopOrders);

      buyerOrder.shopOrders = shopOrders.map((o) => o._id);

      await buyerOrder.save({ session });

      console.log("SHOP ORDER IDS SAVED:", buyerOrder.shopOrders);

      for (const shopOrder of shopOrders) {
        console.log("PROCESSING SHOP ORDER:", shopOrder._id);

        const shop = await Shop.findById(
          shopOrder.shop
        ).session(session);

        console.log("SHOP:", shop);

        if (!shop) {
          console.log("SHOP NOT FOUND:", shopOrder.shop);
          continue;
        }

        const userId = shop.user;

        console.log("SHOP OWNER USER ID:", userId);

        const existingTxn = await WalletTransaction.findOne({
          referenceModel: MODELS.SHOP_ORDER,
          referenceId: shopOrder._id,
        }).session(session);

        console.log("EXISTING SHOP WALLET TRANSACTION:", existingTxn);

        if (existingTxn) {
          console.log(
            "SHOP WALLET TRANSACTION ALREADY EXISTS:",
            shopOrder._id
          );
          continue;
        }

        const wallet = await getOrCreateWallet(userId, session);

        console.log("WALLET:", wallet);

        wallet.pendingBalance =
          (wallet.pendingBalance || 0) +
          (shopOrder.totalAmount || 0);

        await wallet.save({ session });

        console.log(
          "WALLET PENDING BALANCE UPDATED:",
          wallet.pendingBalance
        );

        await WalletTransaction.create(
          [
            {
              wallet: wallet._id,
              userId,
              type: WALLET_TRANSACTION_TYPE.ORDER_EARNING,
              amount: shopOrder.totalAmount || 0,
              referenceModel: MODELS.SHOP_ORDER,
              referenceId: shopOrder._id,
              status: WALLET_TRANSACTION_STATUS.PENDING,
            },
          ],
          { session }
        );

        console.log(
          "SHOP WALLET TRANSACTION CREATED:",
          shopOrder._id
        );
      }
  }

  else if (transaction.payableType === PAYABLE_TYPE.BOOKING) {
    console.log("BOOKING PAYMENT BRANCH");

    const booking = await Booking.findById(
      transaction.payableId
    ).session(session);

    console.log("BOOKING:", booking);

    if (!booking) {
      console.log("BOOKING NOT FOUND");
      return;
    }

    console.log("BOOKING STATUS:", booking.status);

    if (booking.status === BOOKING_STATUS.PAYED) {
      console.log("BOOKING ALREADY PAID");
      return;
    }

    booking.status = BOOKING_STATUS.PAYED;

    await booking.save({ session });

    console.log("BOOKING MARKED PAID");

    const provider = await Provider.findById(
      booking.provider
    ).session(session);

    console.log("PROVIDER:", provider);

    if (!provider) {
      console.log("PROVIDER NOT FOUND:", booking.Provider);
      return;
    }

    const userId = provider.user;

    console.log("PROVIDER USER ID:", userId);

    const existingTxn = await WalletTransaction.findOne({
      referenceModel: MODELS.BOOKING,
      referenceId: booking._id,
    }).session(session);

    console.log("EXISTING BOOKING WALLET TRANSACTION:", existingTxn);

    if (existingTxn) {
      console.log(
        "BOOKING WALLET TRANSACTION ALREADY EXISTS:",
        booking._id
      );
      return;
    }

    const wallet = await getOrCreateWallet(userId, session);

    console.log("PROVIDER WALLET:", wallet);

    wallet.pendingBalance =
      (wallet.pendingBalance || 0) +
      (booking.price || 0);

    await wallet.save({ session });

    console.log(
      "PROVIDER WALLET PENDING BALANCE UPDATED:",
      wallet.pendingBalance
    );

    await WalletTransaction.create(
      [
        {
          wallet: wallet._id,
          userId,
          type: WALLET_TRANSACTION_TYPE.BOOKING_EARNING,
          amount: booking.price || 0,
          referenceModel: MODELS.BOOKING,
          referenceId: booking._id,
          status: WALLET_TRANSACTION_STATUS.PENDING,
        },
      ],
      { session }
    );

    console.log(
      "BOOKING WALLET TRANSACTION CREATED:",
      booking._id
    );
  }

  else {
    console.log(
      "INVALID PAYABLE TYPE:",
      transaction.payableType
    );
  }
};

const handleFailed = async (transaction, session) => {
  const model =
    transaction.payableType === PAYABLE_TYPE.ORDER
      ? BuyerOrder
      : Booking;
  const doc = await model
    .findById(transaction.payableId)
    .session(session);
  if (!doc) return;
  doc.status = "failed";
  await doc.save({ session });
};

const refundPayment = async ({transactionId}) => {
  const paymentTransaction = await PaymentTransaction.findById(transactionId)
  const trackerToken = paymentTransaction?.gatewayData?.trackerToken
  if(trackerToken)
    throw new InternalServerError("Malformed payment transaction document");
  const refundResponse =  await processRefund(trackerToken,paymentTransaction.amount);
  return refundResponse;
}