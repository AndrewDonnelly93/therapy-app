import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Types
import { IBlogEntry } from "./types";

const BlogEntry: React.FC<IBlogEntry> = ({
  blogEntryTitle,
  photo,
  blogEntry,
}) => {
  return <Card sx={{ maxWidth: 345 }}>{blogEntryTitle}</Card>;
};

export default BlogEntry;
