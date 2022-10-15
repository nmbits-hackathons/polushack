import { createSelector } from "@reduxjs/toolkit";
import { Store } from "redux/inerface";

export const applicationSelector = (state: Store) => state.application;

export const isLoadingApplication = createSelector(applicationSelector, state => state.isLoading)

export const errorApplication = createSelector(applicationSelector, state => state.error)

export const applicationsSelector = createSelector(applicationSelector, state => state.applications)