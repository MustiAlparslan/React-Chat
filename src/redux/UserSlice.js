import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setActiveUser } = userSlice.actions;

export default userSlice.reducer;
