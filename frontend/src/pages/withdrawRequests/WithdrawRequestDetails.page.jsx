import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider
} from "@mui/material";

export default function WithdrawRequestDetailsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4">
            Withdraw Request Details
          </Typography>

          <Divider />

          <Typography>Amount: Rs. 5000</Typography>
          <Typography>Wallet: xxxx</Typography>
          <Typography>User: xxxx</Typography>

          <Chip label="PENDING" color="warning" />

          <Typography>
            Admin Note: Waiting for approval
          </Typography>

          <Typography>
            Created At: 2026-06-09
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}