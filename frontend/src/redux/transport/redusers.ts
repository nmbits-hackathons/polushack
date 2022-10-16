import { createSlice } from "@reduxjs/toolkit"
import { TransportState } from "./interface"
import { getTransports } from "redux/transport/actions"

const initialState: TransportState = {
    transports: [],
    isLoading: false,
    error: null
}

const transportSlice = createSlice({
    name: "transport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransports.pending, (draft) => {
                draft.error = null
                draft.isLoading = true
                draft.transports = []
            })
            .addCase(getTransports.fulfilled, (draft, { payload }) => {
                draft.error = null
                draft.isLoading = false
                draft.transports = payload
            })
            .addCase(getTransports.rejected, (draft, { payload }) => {
                draft.error = payload
                draft.isLoading = false
                draft.transports = []
            })
    }
})

export default transportSlice.reducer
