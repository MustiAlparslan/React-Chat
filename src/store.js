import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./redux/UserSlice"
import RoomList from './redux/RoomListSlice'
import RightSideSlice from './redux/RightSideSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    room: RoomList,
    rightSide: RightSideSlice
  },
})