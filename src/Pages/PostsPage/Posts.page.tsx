import React from "react";
import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Posts = () => {
  return (
    <>
      <SearchBar />
      <PostsContainer />
    </>
  );
};

export default Posts;
