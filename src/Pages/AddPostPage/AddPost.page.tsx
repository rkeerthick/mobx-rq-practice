import { useEffect, useState } from "react";
import "./AddPost.scss";
import useStore from "../../Hooks/UseStore";
// import { addPost } from "../../utils/functions";
import { observer } from "mobx-react-lite";
import { Datum } from "../../store/PostsStore";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import useAddPost from "../../Hooks/useAddPost";
import { useQuery } from "react-query";
import { fetchPostByID } from "../../utils/functions";

const AddPost = observer(() => {
  const { id } = useParams();

  const ID: number = id ? +id : 0;
  
  const {
    rootStore: { postsStore },
  } = useStore();

  const { data, isFetched, isLoading, isFetching } = useQuery(
    ["post-detail ", id],
    () => fetchPostByID(ID)
  );

  console.log(data, "data");

  const { mutate } = useAddPost();

  useEffect(() => {
    
    let dervTitle = "";
    let dervContent = "";
    console.log(data?.data?.title, "title");
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

  let posts: Datum[] = postsStore.getPosts;
  console.log(posts, "all posts");

  const handleSubmit = () => {
    const data = {
      id: uuid,
      title: title,
      content: content,
    };

    mutate(data);
    navigate("/");

  };

  return (
    <div className="add-post">
      <div className="add-post__container">
        <>
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
        </>
      </div>
    </div>
  );
});

export default AddPost;
