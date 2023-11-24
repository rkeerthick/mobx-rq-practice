import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Button from "../Button/Button";

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
        <Button
          buttonType="button"
          value="Add Post"
          handleClick={handleAddClick}
          type="secondary"
        />
      </div>
    </header>
  );
};

export default Header;
