import { createSelector } from "@reduxjs/toolkit"
import { Store } from "redux/inerface"

export const transportsSelector = (state: Store) => state.transport

export const getTransportsSelector = createSelector(
    transportsSelector,
    (state) => state.transports
)

export const isLoadingTransports = createSelector(
    transportsSelector,
    (state) => state.isLoading
)

export const errorTransportsSelector = createSelector(
    transportsSelector,
    (state) => state.error
)
