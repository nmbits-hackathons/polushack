import { createSlice } from "@reduxjs/toolkit";
import { ApplicationState} from "redux/application/interface";
import {getApplications} from "redux/application/actions";

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
    }
})

export default applicationsSlice.reducer;