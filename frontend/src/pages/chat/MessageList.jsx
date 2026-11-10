import { useEffect, useRef } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import MessageBubble from "./MessageBubble";

const listSx = {
  flex: 1,
  overflowY: "auto",
  px: 2,
  py: 2,
  bgcolor: "background.default",

  "&::-webkit-scrollbar": {
    width: 6,
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 10,
  },
};

const emptyStateSx = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 3,
};

const emptyTextSx = {
  color: "text.secondary",
  fontSize: "0.9rem",
  textAlign: "center",
};

export default function MessageList({
  messages = [],
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  const listRef = useRef(null);
  const topRef = useRef(null);

  const lastMessageId =
    messages[messages.length - 1]?._id ||
    messages[messages.length - 1]?.tempId;

  useEffect(() => {
    const element = topRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage?.();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    list.scrollTop = list.scrollHeight;
  }, [lastMessageId]);

  if (!messages.length) {
    return (
      <Box sx={emptyStateSx}>
        <Typography sx={emptyTextSx}>
          No messages yet. Start the conversation 🚀
        </Typography>
      </Box>
    );
  }

  return (
    <Box ref={listRef} sx={listSx}>
      <div ref={topRef} />

      {isFetchingNextPage && (
        <Stack sx={{ py: 1, alignItems:"center" }}>
          <CircularProgress size={18} />
        </Stack>
      )}

      <Stack spacing={1}>
        {messages.map((message, index) => (
          <MessageBubble
            key={message._id || message.tempId || index}
            message={message}
          />
        ))}
      </Stack>
    </Box>
  );
}