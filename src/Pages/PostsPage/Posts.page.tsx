import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import UseGetPosts from "../../Hooks/useGetPosts";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../utils/functions";

const Posts = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["Fetched Data"],
    queryFn: fetchPosts,
    // { refetchOnWindowFocus: true }
  }
  );
  return (
    <>
      <SearchBar />
      <PostsContainer
        data={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default Posts;
