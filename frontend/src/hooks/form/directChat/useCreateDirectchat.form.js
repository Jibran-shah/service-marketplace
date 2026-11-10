import { useForm } from "react-hook-form";
import { useCreateDirectChat } from "../../api/directChat/useCreateDirectChat";

export const useCreateDirectChatForm = () => {
  const { mutateAsync, isPending } = useCreateDirectChat();

  const form = useForm({
    defaultValues: {
      userId: ""
    }
  });

  const onSubmit = async (values) => {
    return await mutateAsync(values);
  };

  return {
    form,
    onSubmit,
    isLoading: isPending
  };
};