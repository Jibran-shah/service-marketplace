import { useForm } from "react-hook-form";

export const useBookingForm = () => {
  return useForm({
    defaultValues: {
      provider: "",
      serviceName: "",
      description: "",
      scheduledAt: "",
      durationMinutes: 60,
      price: 0,
      notes: ""
    }
  });
};