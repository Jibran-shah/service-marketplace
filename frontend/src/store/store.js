import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import uiReducer from "./slices/ui.slice";
import chatReducer from "./slices/chat.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    chat: chatReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});