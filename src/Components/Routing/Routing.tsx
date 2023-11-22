import { Routes, Route } from "react-router-dom";
import Posts from "../../Pages/PostsPage/Posts.page";
import AddPost from "../../Pages/AddPostPage/AddPost.page";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/addpost" element={<AddPost />} />
      <Route path="/addpost/:id" element={<AddPost />} />
    </Routes>
  );
};

export default Routing;
