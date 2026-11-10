import { queryClient } from "../../utils/queryCient";
import { queryKeys } from "../../utils/queryKeys";

export const handleNewMessage = (message) => {
  // Get the chat/room this message belongs to
  const chatId = message?.roomId || message?.chatId;

  if (!chatId) {
    return;
  }

  // Build the React Query cache key for this chat
  const queryKey = queryKeys.messages.chat(chatId);

  // Update the cached messages
  queryClient.setQueryData(queryKey, (old) => {
    // No cache yet → create the first page
    if (!old) {
      return {
        pages: [
          {
            messages: [message],
          },
        ],
        pageParams: [],
      };
    }

    // // Check all pages to prevent duplicate messages
    // const exists = old.pages.some((page) =>
    //   (page.messages || []).some((existingMessage) => {

    //     const sameId = existingMessage._id === message._id;

    //     const sameTempId =
    //       message.tempId &&
    //       existingMessage.tempId === message.tempId;

    //     return sameId || sameTempId;
    //   })
    // );

    // // Already in cache → don't add it again
    // if (exists) {
    //   return old;
    // }

    // Copy pages so we don't mutate the existing cache
    const pages = [...old.pages];

    // New messages go into the newest (last) page
    const lastPageIndex = pages.length - 1;
    const lastPage = pages[lastPageIndex];

    // Append the new message to the last page
    pages[lastPageIndex] = {
      ...lastPage,
      messages: [
        ...(lastPage.messages || []),
        message,
      ],
    };

    // Return the updated infinite-query cache
    return {
      ...old,
      pages,
    };
  });
};


/* =========================================================
   DELIVERED
========================================================= */

export const handleDelivered = () => {
  // TODO: Update message status in cache.
};

/* =========================================================
   READ
========================================================= */

export const handleRead = () => {
  // TODO: Update message status in cache.
};

/* =========================================================
   TYPING START
========================================================= */

export const handleTypingStart = () => {
  // TODO: Set typing indicator in cache/state.
};

/* =========================================================
   TYPING STOP
========================================================= */

export const handleTypingStop = () => {
  // TODO: Remove typing indicator from UI/state.
};