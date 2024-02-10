import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../slices/themeSlice";
import userSlice from "../slices/userSlice";

export default configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
  },
});
