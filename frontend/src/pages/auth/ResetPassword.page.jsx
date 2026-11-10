import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import {InputField} from "../../components/InputField";

import { useResetPasswordForm } from "../../hooks/form/auth/useResetPasswordForm";
import { useResetPassword } from "../../hooks/api/auth/useResetPassword";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const form = useResetPasswordForm();
  const mutation = useResetPassword();

  const location = useLocation();

  useEffect(() => {
    // OTP step must happen first
    if (!location.state?.otpVerified) {
      navigate("/forgot-password");
    }
  }, []);

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        // password reset complete → go back to login
        navigate("/login");
      }
    });
  };

  return (
    <AuthForm
      title="Reset Password"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={mutation.isPending}
    >
      <InputField
        label="New Password"
        type="password"
        name="newPassword"
        register={form.register}
        error={form.formState.errors.newPassword}
      />
    </AuthForm>
  );
}