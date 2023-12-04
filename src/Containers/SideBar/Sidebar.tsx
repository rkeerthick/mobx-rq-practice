import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import useStore from "../../Hooks/UseStore";
import { observer } from "mobx-react-lite";

const Sidebar = observer(() => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore },
  } = useStore();
  const handleSignOut = () => {
    loginStore.setLogoutUser();
    navigate("/login");
  };
  const handleMyPost = () => {
    loginStore?.setIsMyPost();
    console.log(loginStore.getIsMyPost, "res");
  };
  console.log(loginStore.getIsMyPost, "res");

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container__user-list">
          <div onClick={handleMyPost}>All Posts</div>
          <div onClick={handleMyPost}>My Posts</div>
        </div>
        <div className="sidebar__container__imp-list">
          {loginStore?.getLoginUser === "" && (
            <>
              <div onClick={() => navigate("/signup")}>Sign Up</div>
              <div onClick={() => navigate("/login")}>Sign In</div>
            </>
          )}
          {loginStore?.getLoginUser !== "" && (
            <>
              <div>Hii, {loginStore.getUserID}</div>
              <div onClick={handleSignOut}>Sign Out</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
