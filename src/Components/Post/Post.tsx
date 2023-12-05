import "./Post.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { post } from "../../Types";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import useStore from "../../Hooks/UseStore";
import {
  fetchPostByID,
  fetchUsersByEmail,
  updateLikes,
} from "../../utils/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Post = ({ id, title, content, handleDelete }: post) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    rootStore: { loginStore },
  } = useStore();

  const { data: userData } = useQuery({
    queryKey: ["user details"],
    queryFn: () => fetchUsersByEmail(loginStore?.loginUser),
  });

  const { data: postData } = useQuery({
    queryKey: ["post details"],
    queryFn: () => fetchPostByID(+id),
  });

  const updateMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: any) => {
      const response = updateLikes(loginStore.getUserID, data);
      return response;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleUpdateLikes = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleDeletePost = (id: string) => {
    handleDelete(id);
  };

  const handleEditPost = (id: string) => {
    navigate(`/addpost/${id}`);
  };

  const handleLike = () => {
    const isContains = userData?.data[0]?.likes.some(
      (data: any) => data.postId === id
    );
    let temp: any[] = [];

    if (isContains) {
      temp = userData?.data[0]?.likes.filter((d: any) => d.postId !== id);
    } else {
      temp = [...(userData?.data[0]?.likes || []), { postId: id }];
    }

    userData?.data[0] && (userData.data[0].likes = temp.slice());
    handleUpdateLikes(userData?.data[0]);
  };

  const handleDislike = () => {
    userData?.data[0]?.dislikes.push({ postId: id });
    handleUpdateLikes(userData?.data[0]);
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container__header">
          {loginStore.getIsMyPost && loginStore?.getUserID > 0 && (
            <>
              <Button
                value="Edit"
                buttonType="button"
                handleClick={() => handleEditPost(id)}
                type="primary"
              />

              <Button
                value="Delete"
                buttonType="button"
                handleClick={() => handleDeletePost(id)}
                type="primary"
              />
            </>
          )}
        </div>
        <h2>{title}</h2>
        <h4>{content}</h4>
        <div className="post__container__footer">
          <div className="post__container__footer__likes" onClick={handleLike}>
            {false ? (
              <AiFillLike className="like-icon" />
            ) : (
              <AiOutlineLike className="like-icon" />
            )}
            {1}
          </div>
          <div
            className="post__container__footer__dislikes"
            onClick={handleDislike}
          >
            {false ? (
              <AiFillDislike className="like-icon" />
            ) : (
              <AiOutlineDislike className="dislike-icon" />
            )}
            {2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
