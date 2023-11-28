import "./Post.scss";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../../utils/functions";
import Button from "../Button/Button";
import { post } from "../../Types";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { useState } from "react";

const Post = ({ id, title, content }: post) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleDeletePost = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error: any) {
      console.error("Error adding item:", error.message);
    }
  };

  const handleEditPost = (id: string) => {
    navigate(`/addpost/${id}`);
  };

  const handleLike = () => {
    setLike((prev) => !prev);
  };

  const handleDislike = () => {
    setDislike((prev) => !prev);
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container__header">
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
        </div>
        <h2>{title}</h2>
        <h4>{content}</h4>
        <div className="post__container__footer">
          <div className="post__container__footer__likes" onClick={handleLike}>
            {like ? (
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
            {dislike ? (
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
