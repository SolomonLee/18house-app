import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apis/apiUser";

const initialState = {
  type: "遊客",
  name: "",
  birthday: "",
};

export const loginAsync = createAsyncThunk("apis/User/login", async (user) => {
  const userData = await api.login(user);
  return userData.user;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.type = "遊客";
      state.name = "";
      state.birthday = "";
    },
  },
  extraReducers: {
    [loginAsync.fulfilled]: (state, action) => {
      state.type = action.payload.type;
      state.name = action.payload.name;
      state.birthday = action.payload.birthday;

      if (action.payload.type !== "遊客") alert("登入成功");
    },
    [loginAsync.rejected]: () => {
      alert("登入失敗");
    },
  },
});

export const { logout } = userSlice.actions;

export const selectType = (state) => state.user.type;
export const selectName = (state) => state.user.name;
export const selectBirthday = (state) => state.user.birthday;

export default userSlice.reducer;
