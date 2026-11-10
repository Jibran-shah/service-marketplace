import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authLoading: false,

  sidebarOpen: true,

  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setAuthLoading,
  toggleSidebar,
  setSidebarOpen,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;