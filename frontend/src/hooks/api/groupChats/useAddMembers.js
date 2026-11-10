import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat/groupChat.service";
import { queryKeys } from "../../../utils/queryKeys";


export const useAddMembers = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupChatService.addMembers,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: queryKeys.groupChat.detail(vars.groupId)
      });
    }
  });
};