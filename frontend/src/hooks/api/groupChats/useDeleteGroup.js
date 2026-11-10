import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat.service";
import { queryKeys } from "../../../queryKeys";

export const useDeleteGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.deleteGroup,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.all
      });
    }
  });
};