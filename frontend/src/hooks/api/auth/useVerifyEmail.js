import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../../../services/auth/auth.service";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};