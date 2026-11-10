import { useForm } from "react-hook-form";

export const useReportForm = () => {
  return useForm({
    defaultValues: {
      entityId: "",
      entityType: "",
      description: "",
    },
  });
};