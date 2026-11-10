import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Chip
} from "@mui/material";

export default function AdminWithdrawRequestsPage() {
  const requests = [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Withdraw Requests (Admin)
      </Typography>

      <Stack spacing={2}>
        {requests.map((req, idx) => (
          <Paper key={idx} sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography>User: {req.userId}</Typography>

              <Typography>Amount: Rs. {req.amount}</Typography>

              <Chip label={req.status} color="warning" />

              <Stack direction="row" spacing={1}>
                <Button color="success" size="small">
                  Approve
                </Button>

                <Button color="error" size="small">
                  Reject
                </Button>

                <Button size="small">
                  Mark Paid
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}