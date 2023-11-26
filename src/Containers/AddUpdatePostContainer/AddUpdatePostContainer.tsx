import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import TextArea from "../../Components/TextArea/TextArea";
import { AddUpdatePost, IData } from "../../Types";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPostByID, updatePost } from "../../utils/functions";
import { v4 as uuid } from "uuid";

const AddUpdatePostContainer = ({ id }: AddUpdatePost) => {
  const queryClient = useQueryClient();

  let query: any;
  if (id > 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    query = useQuery({
      queryKey: ["post-detail ", id],
      queryFn: () => fetchPostByID(id),
    });
  }

  useEffect(() => {
    let dervTitle = "";
    let dervContent = "";

    if (id > 0) {
      dervTitle = query?.data?.data?.title;
      dervContent = query?.data?.data?.content;
      setTitle(dervTitle);
      setContent(dervContent);
    }
  }, [id, query?.data]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const addMutation = useMutation({
    mutationKey: ["addPost"],
    mutationFn: (data: IData) => addPost(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleAddItem = async (data: IData) => {
    try {
      await addMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error adding item:", error.message);
    }
  };

  const updateMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: IData) => {
      const response = updatePost(id, data);
      return response;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleUpdateItem = async (data: IData) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleSubmit = () => {
    const data = {
      id: uuid,
      title: title,
      content: content,
    } as IData;
    if (id > 0) {
      handleUpdateItem(data);
    } else {
      handleAddItem(data);
    }
    navigate("/");
  };

  (query?.isLoading || query?.isFetching) && <h1>Loading...</h1>;
  return (
    <div className="add-post">
      <div className="add-post__container">
        <span className="add-post__container__title">
          {" "}
          {id > 0 ? "Update" : "Add"}
          Post
        </span>
        <form>
          <div className="add-post__container__input">
            <Input
              title="Title"
              type="text"
              value={title}
              placeholder="Enter Title..."
              onChange={handleTitle}
            />
          </div>
          <div className="add-post__container__input">
            <TextArea
              title="Description"
              rows={6}
              placeholder="Write here..."
              onChange={handleContent}
              value={content}
            />
          </div>
          <Button
            value={id > 0 ? "Update" : "Add"}
            buttonType="button"
            handleClick={handleSubmit}
            type="primary"
          />
        </form>
      </div>
    </div>
  );
};

export default AddUpdatePostContainer;
