import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "redux/auth/interface";
import { AsyncThunkConfig } from "redux/inerface";
import { sessionApi } from "../../api";

export const isSession = createAsyncThunk<UserState, string, AsyncThunkConfig>(
  "auth/session",
  // @ts-ignore
  async (token, { rejectWithValue }) => {
    try {
      return await sessionApi(token);
    } catch {
      return rejectWithValue("Ошибка регистрации");
    }
  },
);