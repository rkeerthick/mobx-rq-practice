import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import useStore from "../../Hooks/UseStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore },
  } = useStore();
  const handleSignOut = () => {
    loginStore.setLogoutUser();
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container__user-list">
          <div>All Posts</div>
          <div onClick={() => loginStore.setIsMyPost()}>My Posts</div>
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
};

export default Sidebar;
