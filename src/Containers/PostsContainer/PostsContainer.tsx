import "./PostsContainer.scss";
import Post from "../../Components/Post/Post";
import useStore from "../../Hooks/UseStore";
import { map } from "lodash";
import { postProps } from "../../Types";
import { useState } from "react";
import NoDataFound from "../../assets/gif/no-result-found.gif";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchUsersByEmail } from "../../utils/functions";
import { observer } from "mobx-react-lite";
import Modal from "../../Components/Modal/Modal";
import EditPopup from "../../Components/Edit Popup/EditPopup";
import { setState } from "../../Constant/functions";
import { useNavigate } from "react-router-dom";

const PostsContainer = observer(
  ({ data, isLoading, isFetching, isError, error }: postProps) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);
    const [editPostId, setEditPostId] = useState<string>('');

    const navigate = useNavigate();

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

    if (
      loginUserStore?.isMyPost === "disliked posts" &&
      loginStore?.userId > 0
    ) {
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

    const cancelEdit = () => {
      setState(setIsEdit, !isEdit);
    };

    const handleEdit = (id: string) => {
      setState(setIsEdit, !isEdit);
      setState(setEditPostId, id);
    };

    const acceptEdit = () => {
      navigate(`/addpost/${editPostId}`);
    };

    const handleCancel = (): void => {
      setIsDelete(false);
    };

    const toggleDelete = () => {
      setIsDelete(prev => !prev);
    }

    const handleDelete = (id: number): void => {
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
                handleEdit={handleEdit}
              />
            ))
          ) : (
            <img src={NoDataFound} alt="" />
          )}
        </div>
        <Modal isOpen={isDelete} type="danger">
          <DeletePopup
            id={postId}
            cancelDelete={handleCancel}
            handleDelete={handleDelete}
            toggleDelete={toggleDelete}
          />
        </Modal>
        <Modal isOpen={isEdit} type="warning">
          <EditPopup cancelEdit={cancelEdit} acceptEdit={acceptEdit} />
        </Modal>
      </>
    );
  }
);

export default PostsContainer;
