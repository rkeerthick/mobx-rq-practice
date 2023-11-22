import "./Post.scss";
import useDeletePost from "../../Hooks/useDeletePost";
import { useNavigate } from "react-router-dom";

type IPost = {
  id: string;
  title: string;
  content: string;
};

const Post = ({ id, title, content }: IPost) => {
  const { mutate } = useDeletePost();
  const navigate = useNavigate();
  const deletePost = (id: string) => {
    console.log(id, "delete id");
    mutate(id);
  };

  const editPost = (id: string) => {
    navigate(`/addpost/${id}`);
    console.log(id);
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container__header">
          <button type="button" onClick={() => editPost(id)}>
            Edit
          </button>
          <button type="button" onClick={() => deletePost(id)}>
            Delete
          </button>
        </div>
        <h2>{title}</h2>
        <h4>{content}</h4>
      </div>
    </div>
  );
};

export default Post;
