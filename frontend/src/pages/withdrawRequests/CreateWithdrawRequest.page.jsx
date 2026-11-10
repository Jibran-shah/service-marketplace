import {
  Box,
  Paper,
  Typography,
  Button,
  Stack
} from "@mui/material";

import {InputField} from "../../components/common/InputField";

export default function CreateWithdrawRequestPage() {
  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" mb={3}>
          Create Withdraw Request
        </Typography>

        <Stack spacing={2}>
          <InputField
            label="Amount"
            name="amount"
            type="number"
          />

          <InputField
            label="Wallet ID"
            name="wallet"
          />

          <Button variant="contained">
            Submit Request
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}