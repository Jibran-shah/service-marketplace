import { useForm } from "react-hook-form";
import { useSendMessage } from "../../api/messages/useSendMessage";

export const useSendMessageForm = (chatId) => {
  const { mutateAsync, isPending } = useSendMessage();

  const form = useForm({
    defaultValues: {
      chatId,
      chatModel: "DirectChat",
      type: "text",
      text: "",
      media: []
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