import { useEffect, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { useGetChatMessagesInfinite } from "../../hooks/api/messages/messages.hooks";

import {
  registerChatSocket,
  unregisterChatSocket,
} from "../../socket/utils/chat.socket.utils";

import * as chatHandlers from "../../socket/handlers/chatPage.handlers";
import { sendMessage } from "../../socket/actions/chat.socket.actions";

const chatContainerSx = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
};

const messageAreaSx = {
  flex: 1,
  minHeight: 0,
  display: "flex",
};

const inputAreaSx = {
  borderTop: "1px solid",
  borderColor: "divider",
};

export default function ChatContainer({ chat }) {

  console.log(chat);

  const { user } = useSelector((state) => state.auth);

  const chatId = chat?.id || chat?._id;
  const userId = user?.id || user?._id;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatMessagesInfinite(chatId);

  const messages =
    data?.pages?.flatMap((page) => page.messages || []) || [];

  const handlers = useMemo(
    () => ({
      from: "Chat Container",
      onNewMessage: chatHandlers.handleNewMessage,
      onDelivered: chatHandlers.handleDelivered,
      onRead: chatHandlers.handleRead,
      onTypingStart: chatHandlers.handleTypingStart,
      onTypingStop: chatHandlers.handleTypingStop,
    }),
    []
  );

  useEffect(() => {
    if (!chatId) return;

    registerChatSocket(handlers);

    return () => {
      unregisterChatSocket(handlers);
    };
  }, [chatId, handlers]);

  const otherParticipant = chat?.participants?.find(
    (participant) => participant?._id !== userId
  ) ?? chat?.participants?.[0];

  const title =
    otherParticipant?.profile?.name || "New Chat";
  
  const avatar = otherParticipant?.profile?.avatar?.file?.url;

  const handleSend = (text) => {
    const tempId =
      crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random()}`;

    sendMessage({
      roomId: chatId,
      content: text,
      tempId,
      senderId: userId,
      receiverId: otherParticipant?._id,
    });
  };

  return (
    <Paper elevation={0} sx={chatContainerSx}>
      <ChatHeader title={title} avatar={avatar} />

      <Box sx={messageAreaSx}>
        <MessageList
          messages={messages}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Box>

      <Box sx={inputAreaSx}>
        <MessageInput onSend={handleSend} />
      </Box>
    </Paper>
  );
}