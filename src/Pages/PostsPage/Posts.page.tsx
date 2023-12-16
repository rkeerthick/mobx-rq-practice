import "./PostsPage.scss";
import PostsContainer from "../../Containers/PostsContainer/PostsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import UseGetPosts from "../../Hooks/useGetPosts";
import { useState } from "react";
import { search, setState } from "../../Constant/functions";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersByEmail } from "../../utils/functions";
import useStore from "../../Hooks/UseStore";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";

const Posts = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isFetching, isError, error } = UseGetPosts();
  console.log(toJS(posts), 'posts')
  const [searchText, setSearchText] = useState("");
  const {
    rootStore: { loginStore },
  } = useStore();

  const { data } = useQuery({
    queryKey: ["user details"],
    queryFn: () => fetchUsersByEmail(loginStore?.loginUser),
  });
  loginStore.setUserID(data?.data[0]?.id);
  let resultData = posts?.data;
  if (searchText.length > 0) {
    resultData = search(posts?.data, searchText);
  }
  return (
    <div className="page-container">
      {loginStore?.loginUser !== "" && (
        <Button
          buttonType="button"
          type="add-post-btn"
          value="+"
          handleClick={() => navigate("/addpost")}
        />
      )}
      <SearchBar
        handleSearchText={(data: string) => setState(setSearchText, data)}
      />
      <PostsContainer
        data={resultData}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error?.message}
      />
    </div>
  );
};

export default Posts;
