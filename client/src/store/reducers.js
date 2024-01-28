import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../store/slices/users";

const store = configureStore({
  reducer:{
    userDtails: userSlice,
  }
})

export default store;