import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import UseGetPosts from "../../Hooks/useGetPosts";
import { useEffect, useState } from "react";

const Posts = () => {

  const { data, isLoading, isFetching, isError, error, refetch } = UseGetPosts();
  const [values, setValues] = useState<any>([]);
  useEffect(() => {
    console.log("hii")
    refetch();
    // setValues(data?.data);
  }, [])
  return (
    <>
      <SearchBar />
      <PostsContainer data={data?.data} isLoading={isLoading} isFetching={isFetching} isError={isError} error={error} />
    </>
  );
};

export default Posts;
