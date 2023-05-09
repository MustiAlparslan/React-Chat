import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};

export const rightSide = createSlice({
  name: "RightSide",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = rightSide.actions;

export default rightSide.reducer;
