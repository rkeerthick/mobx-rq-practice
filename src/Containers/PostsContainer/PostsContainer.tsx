import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { IPost } from "../../Types";
import { useState } from "react";
import NoDataFound from "../../assets/gif/no-result-found.gif";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUsersByEmail } from "../../utils/functions";
import { observer } from "mobx-react-lite";

const PostsContainer = observer(
  ({ data, isLoading, isFetching, isError, error }: IPost) => {
    const [isDelete, setIsDelete] = useState(false);
    const [postId, setPostId] = useState(0);
    const {
      rootStore: { postsStore, loginStore, loginUserStore, postStore },
    } = useStore();
    postsStore.setPosts(data);

    const { data: userData } = useQuery({
      queryKey: ["user details"],
      queryFn: () => fetchUsersByEmail(loginStore?.loginUser),
    });
    loginUserStore.setUser(userData?.data[0]);

    const { data: postsData } = useQuery({
      queryKey: ["post details"],
      queryFn: () => fetchPosts(),
    });

    postStore.setPosts(postsData?.data);

    let result = data;
    if (loginUserStore?.isMyPost === "my posts" && loginStore?.userId > 0) {
      result = data?.filter((d: any) => d.userId === loginStore?.userId);
    }

    if (loginUserStore?.isMyPost === "liked posts" && loginStore?.userId > 0) {
      const dummy = userData?.data[0].likes.map(
        (likedPost: any) => likedPost.postId
      );
      result = data?.filter((d: any) => dummy.includes(d.id));
    }

    if (loginUserStore?.isMyPost === "disliked posts" && loginStore?.userId > 0) {
      const dummy = userData?.data[0].dislikes.map(
        (dislikedPost: any) => dislikedPost.postId
      );
      result = data?.filter((d: any) => dummy.includes(d.id));
    }

    if (isLoading || isFetching) {
      return <h1>Loading</h1>;
    }

    if (isError) {
      return <h1>{error}</h1>;
    }

    const handleDelete = (id: number) => {
      setIsDelete((prev) => !prev);
      setPostId(id);
    };

    return (
      <>
        <div className="posts-container">
          {data.length !== 0 &&
          (result.length > 0 || loginStore?.userId === undefined) ? (
            map(result, (post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                likeCount={post.likeCount}
                dislikeCount={post.dislikeCount}
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
  }
);

export default PostsContainer;
