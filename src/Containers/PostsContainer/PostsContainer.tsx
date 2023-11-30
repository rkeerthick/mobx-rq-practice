import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { IPost } from "../../Types";
import { useEffect, useState } from "react";
import NoDataFound from "../../assets/gif/no-result-found.gif";
import Loader from "../../assets/gif/loading.gif";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";

const PostsContainer = ({
  data,
  isLoading,
  isFetching,
  isError,
  error,
}: IPost) => {
  const [isDelete, setIsDelete] = useState(false);
  const [postId, setPostId] = useState(0);

  const {
    rootStore: { postsStore, loginStore },
  } = useStore();
  postsStore.setPosts(data);
  let result = data;
  if (loginStore?.getUserID > 0) {
    result = data?.filter((d: any) => d.userId === loginStore?.getUserID);
  }
  console.log(result, "resulst");
  if (isLoading || isFetching) {
    return <h1>Loading</h1>;
  }

  const handleDelete = (id: number) => {
    setIsDelete((prev) => !prev);
    setPostId(id);
  };

  console.log(loginStore.getUserID, "hello");
  return (
    <>
      <div className="posts-container">
        {data.length !== 0 &&
        (result.length > 0 || loginStore.getUserID === undefined) ? (
          map(result, (post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <img src={NoDataFound} alt="" />
        )}
      </div>
        <DeletePopup
          className="delete-popup"
          id={postId}
          isDelete={isDelete}
          handleDelete={handleDelete}
        />
    </>
  );
};

export default PostsContainer;
