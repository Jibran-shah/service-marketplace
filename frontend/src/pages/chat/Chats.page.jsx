import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ChatSidebar from "./ChatSidebar";
import ChatContainer from "./ChatContainer";
import MasterDetailLayout from "../../components/MasterDetailLayout";

import { useGetUserDirectChats } from "../../hooks/api/directChats/directChats.hooks";
import { setSelectedChat } from "../../store/slices/chat.slice";

export default function ChatsPage() {
  
  const dispatch = useDispatch();

  const chat = useSelector(
    (state) => state.chat.selectedChat
  );

  const {
    data: chats,
    isLoading,
    error,
  } = useGetUserDirectChats();

  const handleSelectChat = (selectedChat) => {
    dispatch(setSelectedChat(selectedChat));
  };

  if (isLoading) {
    return <Typography>Loading chats...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to load chats
      </Typography>
    );
  }

  const activeChatId = chat?._id || chat?.id;

  return (
    <Paper
      elevation={0}
      sx={{
        height: "75vh",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <MasterDetailLayout
        hasSelection={!!chat}
        sidebar={(openMain) => (
          <ChatSidebar
            chats={chats?.data || []}
            activeChatId={activeChatId}
            onSelectChat={(selectedChat) => {
              handleSelectChat(selectedChat);
              openMain();
            }}
          />
        )}
        main={
          chat ? (
            <ChatContainer
              chat={chat}
              chatId={activeChatId}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <Typography variant="h6">
                Select a chat
              </Typography>

              <Typography variant="body2">
                Choose a conversation from the sidebar to start messaging.
              </Typography>
            </Box>
          )
        }
      />
    </Paper>
  );
}