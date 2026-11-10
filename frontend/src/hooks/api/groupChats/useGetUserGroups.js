import { useQuery } from "@tanstack/react-query";
import { groupChatService } from "../../../services/groupChat.service";
import { queryKeys } from "../../../queryKeys";

export const useGetUserGroups = () => {
  return useQuery({
    queryKey: queryKeys.groupChat.list(),
    queryFn: groupChatService.getUserGroups
  });
};