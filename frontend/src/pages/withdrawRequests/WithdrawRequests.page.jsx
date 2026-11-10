import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import WithdrawRequestCard from "../../components/withdraw/WithdrawRequestCard";

export default function WithdrawRequestsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Withdraw Requests
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }}>
        Create Request
      </Button>

      <Stack spacing={2}>
        <WithdrawRequestCard />
      </Stack>
    </Box>
  );
}
