import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat/groupChat.service";
import { queryKeys } from "../../../utils/queryKeys";

export const useRemoveMember = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.removeMember,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};