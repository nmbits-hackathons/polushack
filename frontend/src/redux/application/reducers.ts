import { createSlice } from "@reduxjs/toolkit";
import { ApplicationState} from "redux/application/interface";
import {addNewApplication, getApplications} from "redux/application/actions";

const initialState: ApplicationState = {
    applications: [],
    counts: 0,
    isLoading: false,
    error: null
}
const applicationsSlice = createSlice({
    name: "application",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApplications.pending, (draft) => {
                draft.error = null;
                draft.isLoading = true;
                draft.applications = [];
                draft.counts = 0;
            })
            .addCase(getApplications.fulfilled, (draft, { payload }) => {
                draft.error = null;
                draft.isLoading = false;
                draft.applications = payload.applications;
                draft.counts = payload.counts;
            })
            .addCase(getApplications.rejected, (draft,{ payload }) => {
                draft.error = payload;
                draft.isLoading = true;
                draft.applications = [];
                draft.counts = 0;
            })
            .addCase(addNewApplication.pending, (draft) => {
                draft.error = null;
                draft.isLoading = true;
            })
            .addCase(addNewApplication.fulfilled, (draft, { payload }) => {
                draft.error = null;
                draft.isLoading = false;
                draft.applications.push(payload);
                draft.counts++;
            })
            .addCase(addNewApplication.rejected, (draft,{ payload }) => {
                draft.error = payload;
            })
    }
})

export default applicationsSlice.reducer;