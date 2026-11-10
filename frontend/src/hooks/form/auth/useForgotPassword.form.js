import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../../schemas/auth.schema";

export const useForgotPasswordForm = () => {
  return useForm({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: ""
    },

    mode: "onSubmit"
  });
};