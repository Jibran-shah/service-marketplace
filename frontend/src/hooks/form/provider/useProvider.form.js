import { useForm } from "react-hook-form";

export const useProviderForm = (defaultValues = {}) => {
  return useForm({
    defaultValues: {
      title: "",
      description: "",
      skills: [],
      experienceYears: 0,
      locationLat: null,
      locationLn: null,
      fullAddress: "",
      ...defaultValues
    }
  });
};