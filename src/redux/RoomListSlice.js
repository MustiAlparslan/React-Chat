import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomList: [],
  filteredList: []
};

export const roomListSlice = createSlice({
  name: "RoomList",
  initialState,
  reducers: {
    initialRoomList: (state, action) => {
      state.roomList = action.payload;
      state.filteredList = action.payload;
    },
    filterRoomList: (state, action) => {
      const filteredList = state.roomList.filter((room) => {
        return room.name.toLowerCase().trim().includes(action.payload);
      });
      state.filteredList = filteredList;
    },
  },
});

export const { initialRoomList, filterRoomList } = roomListSlice.actions;

export default roomListSlice.reducer;
