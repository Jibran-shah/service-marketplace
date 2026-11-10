import { useQuery } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat.service";
import { queryKeys } from "../../../queryKeys";

export const useGetGroupById = (groupId) => {
  return useQuery({
    queryKey: queryKeys.groupChat.detail(groupId),
    queryFn: () => groupChatService.getGroupById(groupId),
    enabled: !!groupId
  });
};