import * as paymentTransactionsService from "./payments.service.js";
import { verifyWebhook } from "../../utils/payment.utils.js";
import { BadRequestError } from "../../errors/Http.error.js";

export const createPaymentTransaction = async (req, res) => {
  const result = await paymentTransactionsService.createPaymentTransaction({
    buyerId: req.user.id,
    ...req.validated.body
  });

  res.status(201).json({
    success: true,
    message: "Payment transaction created successfully",
    data: result
  });
};

export const getMyPaymentTransactions = async (req, res) => {
  const result = await paymentTransactionsService.getMyPaymentTransactions({
    buyerId: req.user.id,
    ...req.validated.query
  });

  res.status(200).json({
    success: true,
    message: "Payment transactions fetched successfully",
    data: result
  });
};

export const confirmPayment = async(req,res)=>{
  const result = await paymentTransactionsService.confirmPayment(req.validated?.body.trackerId)
  res.status(200).json({
    success:result.success,
    message:result.success?"payment successfull":"payment failed",
    data:result
  })
}

export const getPaymentTransactionById = async (req, res) => {
  const result = await paymentTransactionsService.getPaymentTransactionById({
    transactionId: req.validated.params.transactionId,
    buyerId: req.user.id
  });

  res.status(200).json({
    success: true,
    message: "Payment transaction fetched successfully",
    data: result
  });
};

export const handlePaymentWebhook = async (req, res) => {

  const result = await paymentTransactionsService.handlePaymentWebhook({
    headers: req.headers,
    body: req.validated?.body,
    gatewayTransactionId:req.validated?.body.gatewayTransactionId,
    status:req.validated?.body.status
  });

  res.status(200).json({
    success: true,
    message: "Webhook processed successfully",
    data: result
  });
};

export const refundPayment = async (req,res) => {
  const result = await paymentTransactionsService.refundPayment({
    transactionId:req.validated?.body.transactionId
  })

  res.status(200).json({
    success: true,
    message: "refunded successfully",
    data:result
  })
}


export const safePayWebhook = async (req, res) => {
  try {
    console.log(req.headers)
    if(!verifyWebhook(req))
      throw new BadRequestError("signature verification failed");
    const result = await paymentTransactionsService.processSafePayWebhook({
      payload: req.body
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Webhook error:", err);

    return res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Webhook failed" });
  }
};