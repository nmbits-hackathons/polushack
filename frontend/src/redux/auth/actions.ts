import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserState } from "redux/auth/interface"
import { AsyncThunkConfig } from "redux/inerface"
import { sessionApi } from "../../api"

type SessionDto = { type?: string; token?: string }

export const isSession = createAsyncThunk<
    UserState,
    SessionDto,
    AsyncThunkConfig
>(
    "auth/session",
    // @ts-ignore
    async ({ type, token }, { rejectWithValue }) => {
        try {
            return await sessionApi(type, token)
        } catch {
            return rejectWithValue("Ошибка регистрации")
        }
    }
)
