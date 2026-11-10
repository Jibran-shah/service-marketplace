
import { Paper, Typography, Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";

/** @type {import("@mui/material").SxProps} */
const bubbleSx = {
  maxWidth: { xs: "85%", sm: "70%", md: "60%" },
  mb: 0.75,
  px: 1.5,
  py: 0.9,
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  boxShadow: "0 1px 2px rgba(0,0,0,.06)",
  transition: "box-shadow .15s ease",
  "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,.08)" },
};

/** @type {import("@mui/material").SxProps} */
const textSx = {
  fontSize: ".94rem",
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
};

/** @type {import("@mui/material").SxProps} */
const timeSx = {
  display: "block",
  mt: 0.4,
  fontSize: ".65rem",
  lineHeight: 1,
  textAlign: "right",
  userSelect: "none",
};

export default function MessageBubble({ message }) {
  const { user } = useSelector((state) => state.auth);
  const isMine =
    (message?.senderId?._id || message?.senderId) === (user?._id || user?.id);

  const time = message?.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <Stack sx={{ ...bubbleSx, alignSelf: isMine ? "flex-end" : "flex-start" }}>
      <Paper
        elevation={0}
        sx={{
          px: 1.5,
          py: 0.9,
          border: "1px solid",
          borderRadius: isMine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          bgcolor: isMine ? "primary.main" : "background.paper",
          color: isMine ? "primary.contrastText" : "text.primary",
          borderColor: isMine ? "primary.main" : "divider",
        }}
      >
        <Typography component="div" sx={textSx}>
          {message.text}
        </Typography>

        {time && (
          <Box
            component="span"
            sx={{
              ...timeSx,
              color: isMine ? "rgba(255,255,255,.7)" : "text.secondary",
            }}
          >
            {time}
          </Box>
        )}
      </Paper>
    </Stack>
  );
}
