import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthLayout from "./AuthLayout";
import { InputField } from "../../components/InputField";

import { useRegister } from "../../hooks/api/auth/useRegister";
import { useRegisterForm } from "../../hooks/form/auth/useRegisterForm";
import { setUser } from "../../store/slices/auth.slice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerMutation = useRegister();
  const form = useRegisterForm();

  const onSubmit = (data) => {
    form.clearErrors();

    registerMutation.mutate(data, {
      onSuccess: (res) => {
        const user = res?.data?.user;
        if (user) {
          dispatch(setUser(user));
        }
        navigate("/emailVerificationGate");
      },

      onError: (error) => {
        const backendError = error?.response?.data?.error;
        backendError?.details?.forEach(({ field, message }) => {
          form.setError(field, {
            type: "server",
            message,
          });
        });

        if (!backendError?.details?.length && backendError?.message) {
          form.setError("root", {
            type: "server",
            message: backendError.message,
          });
        }
      },
    });
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join the marketplace and start buying and selling"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={registerMutation.isPending}
      mode="register"
    >
      <Stack spacing={2}>
        <InputField
          label="Username"
          name="username"
          register={form.register}
          error={form.formState.errors.username}
        />

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
      </Stack>
    </AuthLayout>
  );
}