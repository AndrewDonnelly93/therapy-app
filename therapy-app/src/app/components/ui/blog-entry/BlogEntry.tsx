import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { BLOCKS } from "@contentful/rich-text-types";
import CardContent from "@mui/material/CardContent";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// Types
import { IBlogEntry } from "./types";
// Styles
import { styled } from "@mui/material/styles";

const StyledImage = styled("img")`
  display: block;
  max-width: 300px;
  height: fit-content;
  margin: 30px auto 0;
`;

// @ts-ignore
const BlogEntry: React.FC<IBlogEntry> = ({
  blogEntryTitle,
  photo,
  blogEntry,
}) => {
  if (blogEntry === undefined) {
    return;
  }

  // @ts-ignore
  const document = JSON.parse(JSON.stringify(blogEntry["json"]));

  const options = {
    // @ts-ignore
    renderText: (text) => {
      // @ts-ignore
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <Typography sx={{ marginBottom: 2 }}>{children}</Typography>
      ),
    },
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom: "20px",
        textAlign: "left",
        marginBottom: "30px",
      }}
    >
      <StyledImage src={photo.url} alt={photo.fileName} />
      <CardContent>
        <Typography
          sx={{ marginBottom: 0, textAlign: "center" }}
          variant="h5"
          component="div"
        >
          {blogEntryTitle}
        </Typography>
      </CardContent>

      {documentToReactComponents(document as any, options)}
    </Card>
  );
};

export default BlogEntry;
