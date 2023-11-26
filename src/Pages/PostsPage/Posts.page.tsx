import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import UseGetPosts from "../../Hooks/useGetPosts";
import { useState } from "react";
import { search, setState } from "../../Constant/functions";

const Posts = () => {
  const { data: posts, isLoading, isFetching, isError, error } = UseGetPosts();
  const [searchText, setSearchText] = useState("");
  // const handleSearchText = (data: string) => {
  //   setSearchText(data);
  // };
  let resultData = posts?.data;
  if (searchText.length > 0) {
    resultData = search(posts?.data, searchText);
  }
  return (
    <>
      <SearchBar
        handleSearchText={(data: string) => setState(setSearchText, data)}
      />
      <PostsContainer
        data={resultData}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default Posts;
