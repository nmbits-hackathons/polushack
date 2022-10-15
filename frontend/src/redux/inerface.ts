import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { AuthState } from "redux/auth/interface";
import {ApplicationState} from "redux/application";

export interface Store {
  auth: AuthState;
  application: ApplicationState;
}

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: Store;
  rejectValue: string | null | unknown;
}


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;