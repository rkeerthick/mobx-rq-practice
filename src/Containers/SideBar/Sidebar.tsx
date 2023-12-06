import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import useStore from "../../Hooks/UseStore";
import { observer } from "mobx-react-lite";

const Sidebar = observer(() => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore, postStore, postsStore, loginUserStore },
  } = useStore();
  const handleSignOut = () => {
    // localStorage.removeItem("LoginStore");
    // localStorage.removeItem("LoginUserStore");
    // localStorage.removeItem("Post Store");
    loginStore.setLogoutUser();
    loginUserStore.isMyPost = "all posts";
    navigate("/login");
  };
  const handleMyPost = (data: string) => {
    loginUserStore?.setIsMyPost(data);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container__user-list">
          <div onClick={() => handleMyPost("all posts")}>All Posts</div>
          <div onClick={() => handleMyPost("my posts")}>My Posts</div>
          <div onClick={() => handleMyPost("liked posts")}>Liked by me</div>
          <div onClick={() => handleMyPost("disliked posts")}>Disliked by me</div>
        </div>
        <div className="sidebar__container__imp-list">
          {loginStore?.loginUser === "" && (
            <>
              <div onClick={() => navigate("/signup")}>Sign Up</div>
              <div onClick={() => navigate("/login")}>Sign In</div>
            </>
          )}
          {loginStore?.loginUser !== "" && (
            <>
              <div>Hii, {loginStore?.userId}</div>
              <div onClick={handleSignOut}>Sign Out</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
