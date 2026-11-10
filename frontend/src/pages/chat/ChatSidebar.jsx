import { Box, Stack, Typography, Paper } from "@mui/material";
import ChatCard from "./ChatCard";
import { useSelector } from "react-redux";

export default function ChatSidebar({
  chats = [],
  onSelectChat,
  activeChatId,
  header,
}) {

  const user = useSelector((state)=>state.auth?.user);

  

  return (
    <Paper
      elevation={0}
      sx={{
        width: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Optional header slot */}
      {header && (
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {header}
        </Box>
      )}

      {/* Chat list */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1,
          py: 1,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.15)",
            borderRadius: "10px",
          },
        }}
      >
        {chats.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              No chats yet. Start a conversation 🚀
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0.5}>
            {chats.map((chat) => (
              <ChatCard
                key={chat._id || chat.id}
                chat={chat}
                onSelect={onSelectChat}
                active={activeChatId === (chat._id || chat.id)}
                user={user}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
}