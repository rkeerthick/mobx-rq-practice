import "./AddPost.scss";
import { useEffect, useState } from "react";
import useStore from "../../Hooks/UseStore";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPostByID, addPost, updatePost } from "../../utils/functions";
import { IData } from "../../Types";
import Input from "../../Components/Input/Input";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";

const AddPost = observer(() => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const ID: number = id ? +id : 0;

  const {
    rootStore: { postsStore },
  } = useStore();
  let condiion: boolean = false;
  let query: any;
  if (ID > 0) {
    condiion = true;
    query = useQuery({
      queryKey: ["post-detail ", id],
      queryFn: () => fetchPostByID(ID),
    });
  }

  useEffect(() => {
    let dervTitle = "";
    let dervContent = "";

    if (condiion && ID > 0) {
      dervTitle = query?.data?.data?.title;
      dervContent = query?.data?.data?.content;
      setTitle(dervTitle);
      setContent(dervContent);
    }
    console.log(dervContent, " ,", dervTitle, "dataas");
  }, [query?.data]);

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
      const response = updatePost(ID, data);
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
    if (ID > 0) {
      console.log("updating ", ID);
      handleUpdateItem(data);
    } else {
      handleAddItem(data);
    }
    navigate("/");
  };

  {
    condiion && (query?.isLoading || query?.isFetching) && <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="add-post">
        <div className="add-post__container">
          <span className="add-post__container__title">
            {" "}
            {ID > 0 ? "Update" : "Add"}
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
              value={ID > 0 ? "Update" : "Add"}
              buttonType="button"
              handleClick={handleSubmit}
              type="primary"
            />
          </form>
        </div>
      </div>
    </>
  );
});

export default AddPost;
