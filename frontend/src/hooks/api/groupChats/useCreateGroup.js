import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat.service";
import { queryKeys } from "../../../queryKeys";

export const useCreateGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.createGroup,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.all
      });
    }
  });
};