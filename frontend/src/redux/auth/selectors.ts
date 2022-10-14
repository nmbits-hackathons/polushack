import { createSelector } from "@reduxjs/toolkit";
import { Store } from "redux/inerface";

export const authSelector = (state: Store) => state.auth;

export const userSelector = createSelector(authSelector, state => state.user);

export const isAuthSelector = createSelector(userSelector, state => !!state?.id);

export const isLoadingLogin = createSelector(authSelector, state => state.isLoading);

export const authErrorSelector = createSelector(authSelector, state => state.error);