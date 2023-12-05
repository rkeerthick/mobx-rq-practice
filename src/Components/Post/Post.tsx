import "./Post.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { post } from "../../Types";

import useStore from "../../Hooks/UseStore";
import {
  fetchPostByID, fetchUsersByEmail,
} from "../../utils/functions";
import { useQuery } from "@tanstack/react-query";
import LikeDislikeWrapper from "../LikeDislikeWrapper/LikeDislikeWrapper";

const Post = ({ id, title, content, handleDelete }: post) => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore, loginUserStore },
  } = useStore();
  
const { data: userData } = useQuery({
  queryKey: ["user details"],
  queryFn: () => fetchUsersByEmail(loginStore?.loginUser),
});

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
        <LikeDislikeWrapper userData={userData} id={id}  />
      </div>
    </div>
  );
};

export default Post;
