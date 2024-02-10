import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const getTheme = (state) => state.theme.darkMode;
export default themeSlice.reducer;
