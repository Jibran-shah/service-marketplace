import {
  Box,
  Typography,
  Stack
} from "@mui/material";

import WalletTransactionCard from "../../components/wallet/WalletTransactionCard";

export default function WalletTransactionsPage() {
  const transactions = [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Wallet Transactions
      </Typography>

      <Stack spacing={2}>
        {transactions.length === 0 && (
          <Typography>No transactions found</Typography>
        )}

        {transactions.map((tx, idx) => (
          <WalletTransactionCard
            key={idx}
            transaction={tx}
          />
        ))}
      </Stack>
    </Box>
  );
}