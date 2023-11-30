import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__container__user-list">
          <div>All Posts</div>
          <div>My Posts</div>
        </div>
        <div className="sidebar__container__imp-list">
          <div onClick={() => navigate("/signup", { state: { id: 1 } })}>
            Sign Up
          </div>
          <div onClick={() => navigate("/login", { state: { id: 2 } })}>
            Sign In
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
