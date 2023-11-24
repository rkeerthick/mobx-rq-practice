import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/addpost");
  };
  const handlePostClick = () => {
    navigate("/");
  };
  return (
    <header>
      <div className="header">
        <h1 onClick={handlePostClick}>Posts</h1>
        <button type="button" onClick={handleAddClick}>Add Post</button>
      </div>
    </header>
  );
};

export default Header;
