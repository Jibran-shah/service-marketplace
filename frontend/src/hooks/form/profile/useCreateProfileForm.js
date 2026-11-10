import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfileSchema } from "../../../schemas/profile.schema";

export const useCreateProfileForm = () => {
  return useForm({
    resolver: zodResolver(createProfileSchema),

    defaultValues: {
      name: "",
      phone: "",
      bio: "",
      country: "",
      city: "",
      address: "",
      avatar: null,
      cover: null,
    },

    mode: "onSubmit",
  });
};