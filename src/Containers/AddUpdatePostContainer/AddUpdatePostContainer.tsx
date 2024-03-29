/* eslint-disable react-hooks/rules-of-hooks */
import "./AddUpdatePostContainer.scss";
import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import TextArea from "../../Components/TextArea/TextArea";
import { addUpdatePostProps, dataProps } from "../../Types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addPost,
  fetchPostByID,
  fetchUsersByEmail,
  updatePost,
} from "../../utils/functions";
import { v4 as uuid } from "uuid";
import { setState } from "../../Constant/functions";

const AddUpdatePostContainer = ({ userID }: addUpdatePostProps) => {
  const queryClient = useQueryClient();

  const params = useParams();
  const paramValue = params.id ? +params.id : 0;

  const {
    data: query,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["post-detail ", paramValue],
    queryFn: () => fetchPostByID(paramValue),
  });

  useEffect(() => {
    let dervTitle = "";
    let dervContent = "";

    if (paramValue > 0) {
      dervTitle = query?.data?.title;
      dervContent = query?.data?.content;
      setTitle(dervTitle);
      setContent(dervContent);
    } else {
      setTitle("");
      setContent("");
    }
  }, [paramValue, query?.data]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const addMutation = useMutation({
    mutationKey: ["addPost"],
    mutationFn: (data: dataProps) => addPost(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleAddItem = async (data: dataProps) => {
    try {
      await addMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error adding item:", error.message);
    }
  };

  const updateMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: dataProps) => {
      const response = updatePost(paramValue, data);
      return response;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["unique posts"] }),
  });

  const handleUpdateItem = async (data: dataProps) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleSubmit = () => {
    const data = {
      id: uuid,
      userId: userID,
      title: title,
      content: content,
      likeCount: 0,
      dislikeCount: 0,
    } as dataProps;
    if (paramValue > 0) {
      handleUpdateItem(data);
    } else {
      handleAddItem(data);
    }
    navigate("/");
  };

  (isLoading || isFetching) && <h1>Loading...</h1>;
  return (
    <div className="add-post">
      <div className="add-post__container">
        <span className="add-post__container__title">
          {" "}
          {paramValue > 0 ? "Update" : "Add"}
          Post
        </span>
        <form>
          <div className="add-post__container__input">
            <Input
              title="Title"
              type="text"
              value={title}
              placeholder="Enter Title..."
              onChange={(e: any) => setState(setTitle, e.target.value)}
            />
          </div>
          <div className="add-post__container__input">
            <TextArea
              title="Description"
              rows={6}
              placeholder="Write here..."
              value={content}
              onChange={(e: any) => setState(setContent, e.target.value)}
            />
          </div>
          <Button
            value={paramValue > 0 ? "Update" : "Add"}
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
