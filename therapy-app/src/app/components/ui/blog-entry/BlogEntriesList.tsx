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

// @ts-ignore
const BlogEntriesList: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const blogEntries = useAppSelector(selectBlogEntries);
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
    return <Box>{renderBlogEntries(blogEntries)}</Box>;

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
