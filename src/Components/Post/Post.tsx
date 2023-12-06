import "./Post.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { post } from "../../Types";
import useStore from "../../Hooks/UseStore";
import LikeDislikeWrapper from "../LikeDislikeWrapper/LikeDislikeWrapper";

const Post = ({ id, title, content, handleDelete }: post) => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore, loginUserStore },
  } = useStore();

  const userData = loginUserStore?.getUser;
  const isliked = userData.likes.some((data: any) => id === data.postId);
  const isdisliked = userData.dislikes.some((data: any) => id === data.postId);

  const handleDeletePost = (id: string) => {
    handleDelete(id);
  };

  const handleEditPost = (id: string) => {
    navigate(`/addpost/${id}`);
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container__header">
          {loginStore?.getIsMyPost && loginStore?.getUserID > 0 && (
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
        <LikeDislikeWrapper isDisliked={isdisliked} isLiked={isliked} id={id}  />
      </div>
    </div>
  );
};

export default Post;
