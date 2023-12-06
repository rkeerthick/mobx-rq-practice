import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { IPost } from "../../Types";
import { useState } from "react";
import NoDataFound from "../../assets/gif/no-result-found.gif";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { observer } from "mobx-react-lite";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUsersByEmail } from "../../utils/functions";

const PostsContainer = (
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
    console.log(postsData?.data, 'pos')
    postStore.setPost(postsData?.data);
    
    console.log(postStore.post, 'ss')
    

    let result = data;
    if (loginStore?.getIsMyPost && loginStore?.getUserID > 0) {
      result = data?.filter((d: any) => d.userId === loginStore?.getUserID);
    }

    if (isLoading || isFetching) {
      return <h1>Loading</h1>;
    }

    const handleDelete = (id: number) => {
      setIsDelete((prev) => !prev);
      setPostId(id);
    };

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
  }
);

export default PostsContainer;
