import { useForm } from "react-hook-form";

export const useWithdrawForm = () => {
  return useForm({
    defaultValues: {
      amount: "",
      proofMediaId: null
    }
  });
};