import "../Pages/FormPage/Form.scss";
import { Routes, Route } from "react-router-dom";
import Posts from "../Pages/PostsPage/Posts.page";
import { observer } from "mobx-react-lite";
import FormContainer from "../Containers/FormContainer/FormContainer";
import AddUpdatePostContainer from "../Containers/AddUpdatePostContainer/AddUpdatePostContainer";
import useStore from "../Hooks/UseStore";

const Routing = observer(() => {
  const {
    rootStore: { loginStore },
  } = useStore();

  const userID = loginStore?.getUserID;
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route
        path="/addpost"
        element={<AddUpdatePostContainer userID={userID} />}
      />
      <Route
        path="/addpost/:id"
        element={<AddUpdatePostContainer userID={userID} />}
      />
      <Route path="/login" element={<FormContainer formType="login" />} />
      <Route path="/signup" element={<FormContainer formType="signup" />} />
    </Routes>
  );
});

export default Routing;
