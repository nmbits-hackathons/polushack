import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";

export const reducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;