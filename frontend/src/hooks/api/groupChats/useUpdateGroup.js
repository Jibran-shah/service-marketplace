import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat.service";
import { queryKeys } from "../../../queryKeys";

export const useUpdateGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.updateGroup,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};