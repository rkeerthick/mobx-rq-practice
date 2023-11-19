import { useState } from "react";
import "./AddPost.scss";
import useStore from "../../Hooks/UseStore";
import { addPost } from "../../utils/functions";
import { observer } from "mobx-react-lite";
import { Datum } from "../../store/PostsStore";
import {v4 as uuid} from 'uuid'

const AddPost = observer(() => {
  const {
    rootStore: { postsStore },
  } = useStore();
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleUserId = (e: any) => {
    setUserId(e.target.value);
  };
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleContent = (e: any) => {
    setContent(e.target.value);
  };
  
  let posts: Datum[] = postsStore.getPosts;
  console.log(posts, 'all posts')

  const handleSubmit = async() => {
    const data = {
      id: uuid,
      userId: userId,
      title: title,
      content: content,
    }; 

    const response = await addPost(data);
    posts.push(response.data);
    console.log(posts, 'post')
  };

  return (
    <div className="add-post">
      <div className="add-post__container">
        <span className="add-post__container__title">Add Post</span>
        <form>
          <div className="add-post__container__input">
            <label htmlFor="">User ID</label>
            <input
              type="text"
              placeholder="User Id"
              value={userId}
              onChange={handleUserId}
            />
          </div>
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
  );
});

export default AddPost;
