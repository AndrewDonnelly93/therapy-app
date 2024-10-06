import React, { useEffect } from "react";
// Components
import BlogEntry from "./BlogEntry";
import Box from "@mui/material/Box";
import SkeletonLoader from "./SkeletonLoader";
import ErrorAlert from "app/components/shared/error-aler/ErrorAlert";
// State
import {
  fetchBlogEntries,
  selectBlogEntries,
  BlogEntriesStatus,
  BlogEntriesType,
  selectAboutMeBlogEntry,
} from "app/stores/blogEntriesSlice";
// Hooks
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IBlogEntry } from "./types";

const renderBlogEntries = (blogEntries: IBlogEntry[]) => {
  return blogEntries?.map(({ blogEntryTitle, photo, blogEntry, _id }) => {
    return (
      <BlogEntry
        key={_id}
        blogEntryTitle={blogEntryTitle}
        photo={photo}
        blogEntry={blogEntry}
        _id={_id}
      />
    );
  });
};

interface IBlogEntriesList {
  pathname: string;
}

// @ts-ignore
const BlogEntriesList: React.FC<IBlogEntriesList> = ({ pathname }) => {
  // Hooks
  const dispatch = useAppDispatch();
  const blogEntries = useAppSelector(selectBlogEntries);
  const aboutMeBlogEntry = useAppSelector(selectAboutMeBlogEntry);

  // @ts-ignore
  const blogEntriesStatus = useAppSelector((state) => state.blogEntries.status);
  // @ts-ignore
  const blogEntriesError = useAppSelector((state) => state.blogEntries.error);

  // Fetching blogEntries
  useEffect(() => {
    if (blogEntriesStatus === BlogEntriesStatus.IDLE) {
      // @ts-ignore
      dispatch(fetchBlogEntries());
    }
  }, [blogEntriesStatus, blogEntriesError, dispatch]);

  // Loading
  if (blogEntriesStatus === BlogEntriesStatus.LOADING) {
    return <SkeletonLoader amount={5} />;

    // Successful fetching
  } else if (blogEntriesStatus === BlogEntriesStatus.SUCCEDEED) {
    return (
      <Box>
        {renderBlogEntries(
          pathname === "/main" ? aboutMeBlogEntry : blogEntries
        )}
      </Box>
    );

    // Error while fetching
  } else {
    return (
      <Box>
        <ErrorAlert errorMessage={blogEntriesError} />
      </Box>
    );
  }
};

export default BlogEntriesList;
