import { Stack, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthLayout from "./AuthLayout";
import { InputField } from "../../components/InputField";

import { useLogin } from "../../hooks/api/auth/useLogin";
import { useLoginForm } from "../../hooks/form/auth/useLoginForm";
import { useAuthRedirectIfLoggedIn } from "../../hooks/api/auth/useAuthRedirectIfLoggedIn";

import { login } from "../../store/slices/auth.slice";
import { connectSocket } from "../../socket/socket.manager";
import { subscribeUser } from "../../utils/push.utils";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useLoginForm();
  const loginMutation = useLogin();

  useAuthRedirectIfLoggedIn();

  const onSubmit = (data) => {
    form.clearErrors("root");
    loginMutation.mutate(data, {
      onSuccess: ({ data }) => {
        const user = data?.user;
        dispatch(login(user));
        subscribeUser(user._id || user.id);
        connectSocket();
        if (!user?.isEmailVerified) {
          return navigate("/emailNotVerifiedGate");
        }
        if (!user?.profile) {
          return navigate("/profile/create");
        }
        navigate("/home");

      },

      onError: (error) => {
        console.log(error);
        form.setError("root", {
          type: "server",
          message:
            error?.response?.data?.message || "Login failed",
        });
      },
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your marketplace journey"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={loginMutation.isPending}
      mode="login"
    >
      <Stack spacing={2}>
        <InputField
          label="Email"
          name="email"
          register={form.register}
          error={form.formState.errors.email}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          register={form.register}
          error={form.formState.errors.password}
        />

        {form.formState.errors.root?.message && (
          <Typography
            color="error"
            fontSize={13}
          >
            {form.formState.errors.root.message}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => navigate("/forgot-password")}
            sx={{
              textTransform: "none",
              fontSize: 13,
              color: "text.secondary",
              p: 0,
            }}
          >
            Forgot password?
          </Button>
        </Box>
      </Stack>
    </AuthLayout>
  );
}