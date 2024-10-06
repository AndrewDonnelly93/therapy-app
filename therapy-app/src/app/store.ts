import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import blogEntriesReducer from "./stores/blogEntriesSlice";

export const store = configureStore({
  reducer: {
    blogEntries: blogEntriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
