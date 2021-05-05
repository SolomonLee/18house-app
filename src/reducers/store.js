import { configureStore } from "@reduxjs/toolkit";
import albumsRedux from "./albumsRedux";
import userRedux from "./userRedux";
import messageRedux from "./messageRedux";

export const store = configureStore({
  reducer: {
    albums: albumsRedux,
    message: messageRedux,
    user: userRedux,
  },
});

export default store;
