import { useState } from "react";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const containerSx = {
  p: 1.5,
  bgcolor: "background.paper",
};

const composerSx = {
  display: "flex",
  alignItems: "center",
  px: 1.5,
  py: 0.75,
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  transition: "border-color 0.2s, box-shadow 0.2s",
  "&:focus-within": {
    borderColor: "primary.main",
  },
};

const inputSx = {
  px: 1,
  py: 0.5,
  fontSize: "0.95rem",
  lineHeight: 1.5,
};

const sendButtonSx = {
  ml: 1,
  mb: 0.25,
  width: 38,
  height: 38,
  flexShrink: 0,
  bgcolor: "primary.main",
  color: "primary.contrastText",
  transition: "background-color 0.2s, transform 0.15s",
  "&:hover": {
    bgcolor: "primary.dark",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  "&.Mui-disabled": {
    bgcolor: "action.disabledBackground",
    color: "action.disabled",
  },
};

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={containerSx}>
      <Paper elevation={0} sx={composerSx}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="standard"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          slotProps={{
            input:{
              disableUnderline: true,
              sx: inputSx,
            }
          }}
        />

        <IconButton
          onClick={handleSend}
          disabled={!text.trim()}
          aria-label="Send message"
          sx={sendButtonSx}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Box>
  );
}