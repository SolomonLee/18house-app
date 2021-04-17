import { configureStore } from "@reduxjs/toolkit";
import albumsRedux from "./albumsRedux";
import userRedux from "./userRedux";

export const store = configureStore({
  reducer: {
    albums: albumsRedux,
    user: userRedux,
  },
});

export default store;
