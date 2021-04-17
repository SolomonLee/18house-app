import { configureStore } from "@reduxjs/toolkit";
import albumsRedux from "./albumsRedux";

export const store = configureStore({
  reducer: {
    albums: albumsRedux,
  },
});

export default store;
