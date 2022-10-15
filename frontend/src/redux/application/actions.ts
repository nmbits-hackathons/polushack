import { createAsyncThunk } from "@reduxjs/toolkit";
import {addNewApplicationApi, getApplicationsApi, GetApplicationsData} from "../../api/application";
import { AsyncThunkConfig } from "redux/inerface";
import {Application, CreateApplicationDto} from "redux/application/interface";

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

export const addNewApplication = createAsyncThunk<Application, CreateApplicationDto, AsyncThunkConfig>(
    "application/post",
    async (data, { rejectWithValue }) => {
        try {
            return await addNewApplicationApi(data)
        } catch {
            return rejectWithValue("Не удалось создать заявку");
        }
    }
)