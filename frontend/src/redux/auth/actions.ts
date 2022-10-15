import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "redux/auth/interface";
import { AsyncThunkConfig } from "redux/inerface";
import { sessionApi } from "../../api";

export const isSession = createAsyncThunk<UserState, undefined, AsyncThunkConfig>(
  "auth/session",
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      return await sessionApi();
    } catch {
      return rejectWithValue("Ошибка регистрации");
    }
  },
);