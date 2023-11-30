import Button from "../Button/Button";
import "./DeletePopup.scss";
import { MdClose } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../utils/functions";

const DeletePopup = ({ isDelete, id, handleDelete }: any) => {
  
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });


  const handleDeletePost = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error: any) {
      console.error("Error adding item:", error.message);
    }
    handleDelete();
  };

  return (
    <div className={`delete-popup ${!isDelete && "none"}`}>
      <div className="delete-popup__container">
        <div className="delete-popup__container__cls-btn-wrapper">
          <MdClose className="close-btn" onClick={handleDelete} />
        </div>
        <h3 className="tx-white">
          Are you sure? Do you really want to <em>delete the post</em>?
        </h3>
        <div className="delete-popup__button-wrapper">
          <Button
            type="primary"
            value="Cancel"
            buttonType="button"
            handleClick={handleDelete}
          />
          <Button
            type="danger"
            value="Delete"
            buttonType="button"
            handleClick={() => handleDeletePost(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
