import "./Post.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { post } from "../../Types";
import useStore from "../../Hooks/UseStore";
import LikeDislikeWrapper from "../LikeDislikeWrapper/LikeDislikeWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchPostByID } from "../../utils/functions";

const Post = ({ id, title, content, handleDelete }: post) => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore, loginUserStore },
  } = useStore();

  const userData = loginUserStore.getUser;
  const isliked = userData.likes.some((data: any) => id === data.postId)

        console.log(isliked, id, "like");
  const { data: postData } = useQuery({
    queryKey: ["post details"],
    queryFn: () => fetchPostByID(+id),
  });



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
        <LikeDislikeWrapper isLiked={isliked} id={id}  />
      </div>
    </div>
  );
};

export default Post;
