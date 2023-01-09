import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import ModalSlice from "./ModalState";

const store = configureStore({
  reducer:{
    user : UserSlice.reducer,
    modal : ModalSlice.reducer
  }
});


export default store
