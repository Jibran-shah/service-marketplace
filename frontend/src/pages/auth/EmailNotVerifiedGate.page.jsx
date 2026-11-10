import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useResendVerifyEmail } from "../../hooks/api/auth/useResendVerifyEmail";

const EmailNotVerifiedGate = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const email = user?.email;

  const { mutateAsync: resendEmail, isLoading } = useResendVerifyEmail();

  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      await resendEmail();

      setCooldown(30);

      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f7f9fc, #eef2f7)",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 520,
          width: "100%",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Verify Your Email First
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={2}>
          You are logged in as <strong>{email || "unknown user"}</strong>, but your account is not verified yet.
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          You must verify your email before accessing the dashboard.
        </Alert>

        <Typography variant="body2" color="text.secondary" mb={3}>
          We sent a verification link to your email. If you didn’t receive it, you can resend it below.
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            disabled={isLoading || cooldown > 0}
            onClick={handleResend}
            startIcon={isLoading ? <CircularProgress size={18} /> : null}
          >
            {cooldown > 0
              ? `Resend Email (${cooldown}s)`
              : "Resend Verification Email"}
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Go to Home Page
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="caption" color="text.secondary">
          After verifying your email, refresh this page or log in again.
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmailNotVerifiedGate;