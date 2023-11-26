import { Routes, Route } from "react-router-dom";
import Posts from "../Pages/PostsPage/Posts.page";
import Form from "../Pages/FormPage/Form.page";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/addpost" element={<Form />} />
      <Route path="/addpost/:id" element={<Form />} />
      <Route path="/login" element={<Form />} />
      <Route path="/signup" element={<Form />} />
    </Routes>
  );
};

export default Routing;
