import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Button from "../Button/Button";

const Header = () => {
  const path = window.location.href.split("/")[3];
  const id = window.location.href.split("/")[4];
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
        {path !== "login" && path !== "signup" && (
          <Button
            buttonType="button"
            value="Add Post"
            handleClick={handleAddClick}
            type="secondary"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
