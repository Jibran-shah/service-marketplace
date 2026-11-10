import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schemas/auth.schema";

export const useRegisterForm = () => {
  return useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      username: "",
      email: "",
      password: ""
    },

    mode: "onSubmit"
  });
};