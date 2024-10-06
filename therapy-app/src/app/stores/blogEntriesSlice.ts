import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
// API
import BlogEntries from "app/api/blogEntriesAPI";
// Types
import { IBlogEntry } from "app/components/ui/blog-entry/types";

export enum BlogEntriesStatus {
  "IDLE" = "idle",
  "LOADING" = "loading",
  "SUCCEDEED" = "succeeded",
  "FAILED" = "failed",
}

export interface BlogEntriesState {
  blogEntriesList: IBlogEntry[] | [];
  status: BlogEntriesStatus;
  error: string;
}

const initialState: BlogEntriesState = {
  blogEntriesList: [],
  status: BlogEntriesStatus.IDLE,
  error: "",
};

// Fetching a list of blog entries
export const fetchBlogEntries = createAsyncThunk(
  "blogEntries/fetchBlogEntries",
  async () => {
    const response = await BlogEntries.list();
    // @ts-ignore
    return response.data;
  }
);

export const blogEntriesSlice = createSlice({
  name: "blogEntries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogEntries.pending, (state) => {
        state.status = BlogEntriesStatus.LOADING;
      })
      .addCase(fetchBlogEntries.fulfilled, (state, action) => {
        state.status = BlogEntriesStatus.SUCCEDEED;
        // @ts-ignore
        if (action.payload.data?.blogPostCollection?.items) {
          // @ts-ignore
          state.blogEntriesList = Array.from(
            new Set([
              ...state.blogEntriesList,
              // @ts-ignore
              ...action.payload.data?.blogPostCollection?.items,
            ])
          );
        }
      })
      .addCase(fetchBlogEntries.rejected, (state, action) => {
        state.status = BlogEntriesStatus.FAILED;
        state.error = action.error.message as string;
      });
  },
});

export const selectBlogEntries = (state: RootState) =>
  // @ts-ignore
  state.blogEntries.blogEntriesList;

export default blogEntriesSlice.reducer;
