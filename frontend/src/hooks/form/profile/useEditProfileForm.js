import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../../../schemas/profile.schema";


export const useEditProfileForm = () => {
  return useForm({
    resolver: zodResolver(updateProfileSchema),

    defaultValues: {
      name: "",
      phone: "",
      bio: "",
      country: "",
      city: "",
      address: ""
    },

    mode: "onSubmit"
  });
};