import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import {InputField} from "../../components/InputField";

import { useForgotPasswordForm } from "../../hooks/form/auth/useForgotPassword.form";
import { useForgotPassword } from "../../hooks/api/auth/useForgotPassword";
import { useAuthRedirectIfLoggedIn } from "../../hooks/api/auth/useAuthRedirectIfLoggedIn";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const form = useForgotPasswordForm();
  const mutation = useForgotPassword();

  useAuthRedirectIfLoggedIn("/buyer/dashboard");

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        navigate(`/verify-otp?email=${data.email}`);
      }
    });
  };

  return (
    <AuthForm
      title="Forgot Password"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={mutation.isPending}
    >
      <InputField
        label="Email"
        name="email"
        register={form.register}
        error={form.formState.errors.email}
      />
    </AuthForm>
  );
}