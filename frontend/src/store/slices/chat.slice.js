import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  selectedChatId: null,
  
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 🔥 set full chat object
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      state.selectedChatId = action.payload?._id || action.payload?.id || null;
    },

    // 🔥 set only id (useful for lightweight navigation)
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },

    // 🔥 clear selection
    clearSelectedChat: (state) => {
      state.selectedChat = null;
      state.selectedChatId = null;
    },
  },
});

export const {
  setSelectedChat,
  setSelectedChatId,
  clearSelectedChat,
} = chatSlice.actions;

export default chatSlice.reducer;