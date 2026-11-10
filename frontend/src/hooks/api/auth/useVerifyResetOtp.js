import { useMutation } from "@tanstack/react-query";
import { verifyResetOtp } from "../../../services/auth/auth.service";

export const useVerifyResetOtp = () => {
  return useMutation({
    mutationFn: verifyResetOtp,
  });
};