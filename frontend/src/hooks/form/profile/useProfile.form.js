import { useForm } from "react-hook-form";

export const useProfileForm = (defaultValues = {}) => {
  return useForm({
    defaultValues: {
      name: "",
      phone: "",
      bio: "",
      country: "",
      city: "",
      address: "",
      avatar: null,
      cover: null,
      ...defaultValues,
    },
  });
};