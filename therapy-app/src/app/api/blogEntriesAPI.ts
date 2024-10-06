import { API_URL, ACCESS_TOKEN } from "../config/axios";
// Types
import { IBlogEntry } from "app/components/ui/blog-entry/types";
import axios from "axios";

type GetBlogEntriesResponse = {
  data: IBlogEntry[];
};

const query = `
  {
    blogPostCollection {
      items {
        _id
        blogEntryTitle
        photo {
          url
        }
        blogEntry {
          json 
        }
      }
    }
  }
`;

const options = {
  method: "POST",
  url: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  data: { query },
};

const BlogEntries = {
  /**
   * Returns a list of all blog entries
   * @returns {Promise<GetBlogEntriesResponse>}
   */
  // @ts-ignore
  list: (): Promise<GetBlogEntriesResponse> =>
    // @ts-ignore
    axios.request(options),
};

export default BlogEntries;
