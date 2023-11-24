import "./Post.scss";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../../utils/functions";
import Button from "../Button/Button";
import { post } from "../../Types";


const Post = ({ id, title, content }: post) => {
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
  }

    const handleEditPost = (id: string) => {
      navigate(`/addpost/${id}`);
      console.log(id);
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
        </div>
      </div>
    );
  };

export default Post;
