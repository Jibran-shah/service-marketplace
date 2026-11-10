import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useCreateWithdrawRequest } from "../../hooks/api/withdraw/withdraw.hooks";

export default function WithdrawRequestForm({
  walletId,
  maxAmount,
  onSuccess,
}) {
  const { user } = useSelector(
    (state) => state.auth
  );

  const { mutateAsync, isPending } =
    useCreateWithdrawRequest();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const amount = watch("amount");

  const onSubmit = async (data) => {
    await mutateAsync({
      wallet: walletId,
      amount: Number(data.amount),
    });

    reset();

    onSuccess?.();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        maxWidth: 420,
      }}
    >
      {/* Header */}
      <Stack spacing={0.5} mb={2}>
        <Typography fontWeight={700}>
          Withdraw Funds
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Available balance: ₨ {maxAmount || 0}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            error={!!errors.amount}
            helperText={
              errors.amount?.message
            }
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message:
                  "Minimum withdrawal is 1",
              },
              max: {
                value: maxAmount || Infinity,
                message:
                  "Insufficient wallet balance",
              },
            })}
          />

          {/* Quick hint */}
          {amount > maxAmount && (
            <Typography
              variant="caption"
              color="error"
            >
              Amount exceeds available balance
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            fullWidth
          >
            {isPending
              ? "Requesting..."
              : "Request Withdraw"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}