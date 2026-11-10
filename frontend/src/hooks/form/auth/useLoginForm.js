import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/auth.schema";

export const useLoginForm = () => {
  return useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: ""
    },

    mode: "onSubmit"
  });
};