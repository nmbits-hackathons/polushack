import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApplicationsApi, GetApplicationsData } from "../../api/application";
import { AsyncThunkConfig } from "redux/inerface";

export const getApplications = createAsyncThunk<GetApplicationsData, undefined, AsyncThunkConfig>(
    "application/get",
    async (_, { rejectWithValue }) => {
        try {
            return await getApplicationsApi()
        } catch {
            return rejectWithValue("Ошибка получения списка заявок");
        }
    }
)