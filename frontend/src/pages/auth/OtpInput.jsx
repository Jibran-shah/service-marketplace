import { Box, TextField } from "@mui/material";

export default function OtpInput({ register, error }) {
  return (
    <Box>
      <TextField
        fullWidth
        label="OTP"
        inputProps={{ maxLength: 6 }}
        {...register("otp")}
        error={!!error}
        helperText={error?.message}
      />
    </Box>
  );
}