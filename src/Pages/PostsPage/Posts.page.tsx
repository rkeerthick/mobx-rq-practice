import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import UseGetPosts from "../../Hooks/useGetPosts";

const Posts = () => {
  const { data, isLoading, isFetching, isError, error } = UseGetPosts();
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
