import { Typography, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { usePaymentTransaction } from "../../../hooks/api/payments/payment.hooks";

export default function PaymentTransactionDetailsPage() {
  const { id } = useParams();

  const {
    data: payment,
    isLoading,
    error,
  } = usePaymentTransaction(id);

  if (isLoading) {
    return (
      <>
        <Typography>Loading payment...</Typography>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Typography>Error loading payment.</Typography>
      </>
    );
  }

  // Your hook returns `res`, not `res.data`
  const transaction = payment?.data;

  if (!transaction) {
    return (
      <>
        <Typography>Payment not found.</Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Payment Details
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography>
            Status: {transaction.status}
          </Typography>

          <Typography>
            Amount: {transaction.amount}
          </Typography>

          <Typography>
            Buyer: {transaction.buyer?.name || "N/A"}
          </Typography>

          <Typography>
            Payable Type: {transaction.payableType}
          </Typography>

          <Typography>
            Transaction ID: {transaction._id}
          </Typography>
        </Stack>
      </Paper>
    </>
  );
}