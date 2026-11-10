import { Typography, Stack } from "@mui/material";

import PaymentTransactionCard from "../../components/payments/PaymentTransactionCard";

import { useMyPaymentTransactions } from "../../../hooks/api/payments/payment.hooks";

export default function PaymentTransactionsPage() {
  const {
    data: payments,
    isLoading,
    error,
  } = useMyPaymentTransactions();

  // Your hook currently returns the full Axios response
  const transactions = payments?.data || [];

  if (isLoading) {
    return (
      <>
        <Typography>Loading payments...</Typography>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Typography>Error loading payments.</Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        My Payments
      </Typography>

      <Stack spacing={2}>
        {transactions.length === 0 ? (
          <Typography color="text.secondary">
            No payment transactions found.
          </Typography>
        ) : (
          transactions.map((transaction) => (
            <PaymentTransactionCard
              key={transaction._id}
              transaction={transaction}
            />
          ))
        )}
      </Stack>
    </>
  );
}