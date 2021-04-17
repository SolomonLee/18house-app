import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./tempReducer";

export const store = configureStore({
  reducer: {
    counter: tempReducer,
  },
});

export default store;
