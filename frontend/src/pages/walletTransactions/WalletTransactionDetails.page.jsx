import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider
} from "@mui/material";

export default function WalletTransactionDetailsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4">
            Transaction Details
          </Typography>

          <Divider />

          <Typography>Type: CREDIT</Typography>
          <Typography>Amount: Rs. 5000</Typography>
          <Typography>Wallet ID: xxxx</Typography>
          <Typography>User ID: xxxx</Typography>

          <Chip label="PENDING" color="warning" />

          <Typography>Reference Model: ORDER</Typography>
          <Typography>Reference ID: 123456</Typography>
          <Typography>Created At: 2026-06-09</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}