import { useEffect, useState } from "react";
import "./AddPost.scss";
import useStore from "../../Hooks/UseStore";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchPostByID,
  addPost,
  updatePost,
  fetchPosts,
} from "../../utils/functions";

const AddPost = observer(() => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const ID: number = id ? +id : 0;

  const {
    rootStore: { postsStore },
  } = useStore();
  
    const { data: data, isFetched, isLoading, isFetching } = useQuery({
      queryKey: ["post-detail ", id],
      queryFn: () => fetchPostByID(ID),
    });
  

  // console.log(data, "data");

  // const { mutate: addPost } = useAddPost();

  useEffect(() => {
    let dervTitle = "";
    let dervContent = "";
    // console.log(data?.data?.title "title");
    if (ID > 0) {
      dervTitle = data?.data?.title;
      dervContent = data?.data?.content;
      setTitle(dervTitle);
      setContent(dervContent);
    }
    console.log(dervContent, " ,", dervTitle, "dataas");
  }, [data]);

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
    mutationFn: (data: {}) => addPost(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Fetched Data"] }),
  });
  const { refetch } = useQuery({
    queryKey: ["reloaded data"],
    queryFn: fetchPosts,
  });

  const handleAddItem = async (data: {}) => {
    try {
      await addMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error adding item:", error.message);
    }
  };

  const updateMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: (data: {}) => {
      const response = updatePost(ID, data);
      return response;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Fetched Data"] }),
  });

  const handleUpdateItem = async (data: {}) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error: any) {
      console.error("Error updating item:", error.message);
    }
    refetch();
  };

  const handleSubmit = () => {
    const data = {
      id: uuid,
      title: title,
      content: content,
    };
    if (ID > 0) {
      console.log("updating ", ID);
      handleUpdateItem(data);
    } else {
      handleAddItem(data);
    }
    navigate("/");
  };

  return (
    <>
      {(isLoading || isFetching) && <h1>Loading...</h1>}
      {isFetched && (
        <>
          <div className="add-post">
            <div className="add-post__container">
              <span className="add-post__container__title">Add Post</span>
              <form>
                <div className="add-post__container__input">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitle}
                  />
                </div>
                <div className="add-post__container__input">
                  <label htmlFor="">Description</label>
                  <textarea
                    placeholder="Content"
                    rows={6}
                    value={content}
                    onChange={handleContent}
                  />
                </div>
                <button type="button" onClick={handleSubmit}>
                  Add
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default AddPost;
