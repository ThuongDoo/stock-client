import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      state.username = "Do Manh Thuong";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export const getUser = (state) => state.user;
export default userSlice.reducer;
