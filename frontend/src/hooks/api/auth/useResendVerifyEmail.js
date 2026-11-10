import { useMutation } from "@tanstack/react-query";
import { resendVerifyEmail } from "../../../services/auth/auth.service";

export const useResendVerifyEmail = () => {
  return useMutation({
    mutationFn: resendVerifyEmail,
  });
};