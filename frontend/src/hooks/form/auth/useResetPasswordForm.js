import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../../schemas/auth.schema";

export const useResetPasswordForm = () => {
  return useForm({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      newPassword: ""
    },

    mode: "onSubmit"
  });
};