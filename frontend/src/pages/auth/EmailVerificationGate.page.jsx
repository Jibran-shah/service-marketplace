import { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useResendVerifyEmail } from "../../hooks/api/auth/useResendVerifyEmail";

const EmailVerificationGate = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isVerified = user?.isEmailVerified;
  const email = user?.email;

  const { mutateAsync: resendEmail, isLoading } = useResendVerifyEmail();

  useEffect(() => {
    if (isVerified) {
      navigate("/dashboard", { replace: true });
    }
  }, [isVerified, navigate]);

  const handleResend = async () => {
    try {
      await resendEmail();
    } catch (err) {
      console.error(err);
    }
  };

  if (isVerified) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 520,
          width: "100%",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Verify Your Email
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={2}>
          We’ve sent a verification link to{" "}
          <strong>{email || "your email"}</strong>.
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          Access is restricted until email verification is completed.
        </Alert>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Please check your inbox and spam folder. You can resend the email if needed.
        </Typography>

        <Stack spacing={2}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Back Home
          </Button>

          <Button
            variant="outlined"
            onClick={handleResend}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={18} /> : null}
          >
            {isLoading ? "Sending..." : "Resend Verification Email"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmailVerificationGate;