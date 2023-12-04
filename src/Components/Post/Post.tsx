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
import { useState } from "react";
import useStore from "../../Hooks/UseStore";

const Post = ({ id, title, content, handleDelete }: post) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const {
    rootStore: { loginStore },
  } = useStore();

  const handleDeletePost = (id: string) => {
    handleDelete(id);
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
          {(loginStore.getIsMyPost && loginStore?.getUserID > 0) && (
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
