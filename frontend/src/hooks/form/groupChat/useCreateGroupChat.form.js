import { useForm } from "react-hook-form";
import { useCreateGroup } from "../../api/groupChat/useCreateGroup";

export const useCreateGroupForm = () => {
  const { mutateAsync, isPending } = useCreateGroup();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      avatar: null,
      members: []
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