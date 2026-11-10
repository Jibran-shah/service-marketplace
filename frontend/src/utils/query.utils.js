// utils/queryUtils.js

import { getDirectChat } from "../services/directChat/directChat.service";
import { queryClient } from "./queryCient";
import { queryKeys } from "./queryKeys";


export const ensureChatData = async (chatId) => {
  return await queryClient.ensureQueryData({
    queryKey: queryKeys.chat.conversation(chatId),
    queryFn: ()=>getDirectChat(chatId)
  });
};