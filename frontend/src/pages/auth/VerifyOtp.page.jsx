import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import OtpInput from "./OtpInput";

import { useOtpForm } from "../../hooks/form/auth/useOtpForm";
import { useVerifyResetOtp } from "../../hooks/api/auth/useVerifyResetOtp";

import { useSearchParams } from "react-router-dom";

import { useEffect } from "react";

export default function VerifyOtpPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useOtpForm();
  const mutation = useVerifyResetOtp();

  useEffect(() => {
    if (!email) {
      navigate("/reset-password", { state: { otpVerified: true } });
    }
  }, [email]);

  const onSubmit = (data) => {
    mutation.mutate({ ...data, email }, {
      onSuccess: () => {
        navigate("/reset-password");
      }
    });
  };

  return (
    <AuthForm
      title="Verify OTP"
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={mutation.isPending}
    >
      <OtpInput
        register={form.register}
        error={form.formState.errors.otp}
      />
    </AuthForm>
  );
}