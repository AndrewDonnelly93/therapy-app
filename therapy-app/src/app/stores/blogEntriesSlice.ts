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
  aboutMe: IBlogEntry[];
  status: BlogEntriesStatus;
  error: string;
}

const initialState: BlogEntriesState = {
  blogEntriesList: [],
  aboutMe: [],
  status: BlogEntriesStatus.IDLE,
  error: "",
};

export enum BlogEntriesType {
  "MAIN" = "main",
  "BLOG" = "blog",
}

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
          const mergedPayload = state.blogEntriesList.concat(
            // @ts-ignore
            action.payload.data?.blogPostCollection?.items
          );
          const updatedState = new Map();
          mergedPayload.forEach((item) =>
            item.blogEntryTitle === "About me"
              ? // @ts-ignore
                (state.aboutMe = [item])
              : updatedState.set(item._id, item)
          );

          // @ts-ignore
          state.blogEntriesList = Array.from(updatedState.values());
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

export const selectAboutMeBlogEntry = (state: RootState) =>
  // @ts-ignore
  state.blogEntries.aboutMe;

export default blogEntriesSlice.reducer;
