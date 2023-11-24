import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import UseGetPosts from "../../Hooks/useGetPosts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPosts } from "../../utils/functions";

const Posts = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    "Fetched Data",
    fetchPosts,
    // { refetchOnWindowFocus: true }
  );
  useEffect(() => {
    console.log(data?.data, 'data')
  }, []);
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
