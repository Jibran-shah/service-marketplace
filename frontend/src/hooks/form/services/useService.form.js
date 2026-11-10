import { useForm } from "react-hook-form";

export const useServiceForm = (
  defaultValues = {}
) => {
  return useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      durationHours: 0,
      category: "",
      ...defaultValues
    }
  });
};