import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: [true, true, true, true],
  reducers: {
    setCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const getCategory = (state) => state.category;
export default categorySlice.reducer;
