import "./Post.scss";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../../utils/functions";

type IPost = {
  id: string;
  title: string;
  content: string;
};

const Post = ({ id, title, content }: IPost) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleDeletePost = async (id: string) => {
    console.log(id, "delete id");
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error: any) {
      console.error("Error adding item:", error.message);
    }
  };

  const handleEditPost = (id: string) => {
    navigate(`/addpost/${id}`);
    console.log(id);
  };

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container__header">
          <button type="button" onClick={() => handleEditPost(id)}>
            Edit
          </button>
          <button type="button" onClick={() => handleDeletePost(id)}>
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
