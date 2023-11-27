import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { IPost } from "../../Types";
import { useEffect } from "react";
import NoDataFound from "../../assets/gif/no-result-found.gif";
import Loader from "../../assets/gif/loading.gif";

const PostsContainer = ({
  data,
  isLoading,
  isFetching,
  isError,
  error,
}: IPost) => {
  const {
    rootStore: { postsStore, loginStore },
  } = useStore();
  postsStore.setPosts(data);
  let result;
  if (loginStore?.getUserID > 0) {
    result = data?.filter((d: any) => d.userId === loginStore?.getUserID);
  }
  console.log(result, "resulst");
  if (isLoading || isFetching) {
    return <h1>Loading</h1>;
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     <img src={Loader} alt="" />;
  //   }, 3000);
  // }, []);
  return (
    <div className="posts-container">
      {result.length === 0 && <img src={NoDataFound} alt="" />}
      {result &&
        map(result, (post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
          />
        ))}
    </div>
  );
};

export default PostsContainer;
