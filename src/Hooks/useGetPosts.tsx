import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../utils/functions";

const UseGetPosts = () => {
  return useQuery({ queryKey: ["unique posts"], queryFn: fetchPosts });
};

export default UseGetPosts;
