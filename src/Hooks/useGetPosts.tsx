import { useQuery } from "react-query";
import { fetchPosts } from "../utils/functions";

const UseGetPosts = () => {
  return useQuery("unique posts", fetchPosts);
};

export default UseGetPosts;