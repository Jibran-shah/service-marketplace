import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyResetOtpSchema } from "../../../schemas/auth.schema";

export const useOtpForm = () => {
  return useForm({
    resolver: zodResolver(verifyResetOtpSchema),

    defaultValues: {
      email: "",
      otp: ""
    },

    mode: "onSubmit"
  });
};