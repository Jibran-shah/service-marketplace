import { Box, Stack, Paper, Typography, Avatar, Badge } from "@mui/material";
import { useMemo } from "react";

export default function ChatCard({
  chat,
  onSelect,
  active = false,
  user,
}) {
  const id = chat?._id || chat?.id;
  const otherParticipant = useMemo(() => {
    if (!chat?.participants) return null;
    return chat.participants.find(p => p?._id !== user?.id);
  }, [chat, user]);

  const profile = otherParticipant?.profile;
  const lastMessage = chat?.lastMessage?.content || "No messages yet";

  console.log(chat,otherParticipant,user)

  return (
    <Paper
      elevation={0}
      onClick={()=>{ 
        onSelect?.(chat)
      }}
      sx={{
        p: 1.5,
        cursor: "pointer",
        borderRadius: 2,
        border: "1px solid",
        borderColor: active ? "primary.main" : "divider",
        bgcolor: active ? "action.selected" : "background.paper",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",

        "&:hover": {
          bgcolor: "action.hover",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{
        alignItems:"center",
        width:"100%"
      }}
      >
        {/* Avatar with subtle badge support */}
        <Badge
          variant="dot"
          color="success"
          invisible={!chat?.isOnline}
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
              fontWeight: 600,
              bgcolor: "primary.main",
            }}
            src={profile?.avatar?.file?.url}
          >
            {profile?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Badge>

        {/* Chat Info */}
        <Box sx={{
          display:"flex",
          flexDirection:"column",
          minWidth:0
        }}>
          <Typography
            fontWeight={600}
            noWrap
            sx={{ fontSize: "0.95rem", lineHeight: 1.2 }}
          >
            {profile?.name}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
              mt: 0.3,
            }}
          >
            {lastMessage}
          </Typography>
        </Box>

        {/* Optional meta (future unread count / time) */}
        {chat?.unreadCount > 0 && (
          <Box
            sx={{
              minWidth: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "white",
              fontSize: "0.7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 0.5,
            }}
          >
            {chat.unreadCount}
          </Box>
        )}
      </Stack>
    </Paper>
  );
}