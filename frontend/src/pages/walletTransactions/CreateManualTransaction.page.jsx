import {
  Box,
  Paper,
  Typography,
  Button,
  Stack
} from "@mui/material";

import {InputField} from "../../components/common/InputField";

export default function CreateManualTransactionPage() {
  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" mb={3}>
          Create Manual Transaction
        </Typography>

        <Stack spacing={2}>
          <InputField label="User ID" name="userId" />
          <InputField label="Wallet ID" name="wallet" />
          <InputField label="Type (CREDIT/DEBIT)" name="type" />
          <InputField label="Amount" name="amount" type="number" />
          <InputField label="Reference Model" name="referenceModel" />
          <InputField label="Reference ID" name="referenceId" />
          <InputField label="Notes" name="notes" />

          <Button variant="contained">
            Create Transaction
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}