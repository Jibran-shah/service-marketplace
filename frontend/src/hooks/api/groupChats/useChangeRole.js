import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat.service";
import { queryKeys } from "../../../queryKeys";

export const useChangeRole = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.changeRole,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};