import { useState } from "react";
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
  console.log(ID, "id");
  const {
    rootStore: { postsStore },
  } = useStore();

  const { data, isFetched } = useQuery(["post-detail ", id], () => fetchPostByID(ID));

  console.log(data, "data");

  let dervTitle = "";
  let dervContent = "";
  dervTitle = data?.data?.title;
  dervContent = data?.data?.content;
  
  console.log(dervContent, ' ,', dervTitle)

  const { mutate } = useAddPost();
  // const [userId, setUserId] = useState('');
  const [title, setTitle] = useState(dervTitle);
  const [content, setContent] = useState(dervContent);

  const navigate = useNavigate();

  // const handleUserId = (e: any) => {
  //   setUserId(e.target.value);
  // };
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

    // const response = await addPost(data);
    // console.log(response.data, 'data')
    // posts.push(response.data);
    // console.log(posts, 'post')
  };

  return (
    <div className="add-post">
      <div className="add-post__container">
        {isFetched && (
          <>
            <span className="add-post__container__title">Add Post</span>
            <form>
              {/* <div className="add-post__container__input">
            <label htmlFor="">User ID</label>
            <input
              type="text"
              placeholder="User Id"
              value={userId}
              onChange={handleUserId}
            />
          </div> */}
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
        )}
      </div>
    </div>
  );
});

export default AddPost;
