import { createAsyncThunk } from "@reduxjs/toolkit"
import { Transport } from "./interface"
import { AsyncThunkConfig } from "redux/inerface"
import { getTransportsApi } from "../../api/transport"

export const getTransports = createAsyncThunk<
    Transport[],
    undefined,
    AsyncThunkConfig
>("trasports/get", async (_, { rejectWithValue }) => {
    try {
        return await getTransportsApi()
    } catch {
        return rejectWithValue("Не удалось получить транспорт")
    }
})
