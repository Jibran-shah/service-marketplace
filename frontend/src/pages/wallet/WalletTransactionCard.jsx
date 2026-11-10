import { Paper, Typography, Chip, Stack, Button } from "@mui/material";

export default function WalletTransactionCard({ transaction = {} }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography fontWeight={600}>
          {transaction.type || "TRANSACTION"}
        </Typography>

        <Typography>
          Amount: Rs. {transaction.amount}
        </Typography>

        <Chip
          label={transaction.status || "PENDING"}
          color={
            transaction.status === "COMPLETED"
              ? "success"
              : transaction.status === "FAILED"
              ? "error"
              : "warning"
          }
        />

        <Typography variant="body2">
          Reference: {transaction.referenceModel || "N/A"}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button size="small">
            View
          </Button>

          <Button size="small">
            Details
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}