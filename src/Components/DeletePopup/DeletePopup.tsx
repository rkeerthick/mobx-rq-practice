import Button from "../Button/Button";
import "./DeletePopup.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../utils/functions";
import { observer } from "mobx-react-lite";
import { deletePopupProps } from "../../Types";

const DeletePopup = observer(
  ({ cancelDelete, id, handleDelete, toggleDelete}: deletePopupProps) => {
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
      toggleDelete();
    };

    return (
      <>
        <h3 className="tx-white">
          Are you sure? Do you really want to <em>delete the post</em>?
        </h3>
        <div className="delete-popup__button-wrapper">
          <Button
            type="primary"
            value="Cancel"
            buttonType="button"
            handleClick={cancelDelete}
          />
          <Button
            type="danger"
            value="Delete"
            buttonType="button"
            handleClick={() => handleDeletePost(id)}
          />
        </div>
      </>
    );
  }
);

export default DeletePopup;
