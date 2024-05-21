import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "",
    roles: null,
    expirationDate: null,
    email: null,
    phone: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.roles = action.payload.roles;
      state.expirationDate = action.payload.expirationDate;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
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
