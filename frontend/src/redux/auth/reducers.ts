import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./interface";
import { isSession } from "./actions";

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    email: null,
    position: "dispatcher",
  },
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(draft) {
      draft.error = null;
      draft.isLoading = false;
      draft.user = null;
    }
  },
  extraReducers: ( builder) => {
    builder
      .addCase(isSession.pending, (draft) => {
        draft.error = null;
        draft.isLoading = true;
        draft.user = null;
      })
      .addCase(isSession.fulfilled, (draft, { payload }) => {
        draft.error = null;
        draft.isLoading = false;
        if (payload) {
          draft.user = payload;
        }
      })
      .addCase(isSession.rejected, (draft, { payload }) => {
        draft.error = payload;
        draft.isLoading = false;
        draft.user = null;
      });
  },
},
);

export const { logOut } = authSlice.actions
export default authSlice.reducer;