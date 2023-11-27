import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Button from "../Button/Button";
import useStore from "../../Hooks/UseStore";

const Header = () => {
  const path = window.location.href.split("/")[3];
  const id = window.location.href.split("/")[4];
  const navigate = useNavigate();

  const {
    rootStore: { loginStore },
  } = useStore();

  console.log(loginStore?.getLoginUser, "loginUser");

  const loggedInUser = loginStore?.getLoginUser;

  const handleAddClick = () => {
    navigate("/addpost");
  };
  const handlePostClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <header>
      <div className="header">
        <h1 onClick={handlePostClick}>Posts</h1>
        {loggedInUser && (
          <div className="header__container">
            <h3>Hello, {loggedInUser}</h3>
            <Button
              buttonType="button"
              value="Add Post"
              handleClick={handleAddClick}
              type="secondary"
            />
          </div>
        )}
        {!loggedInUser && (
          <div className="header__container">
            <Button
              buttonType="button"
              value="Sign Up"
              handleClick={handleSignUp}
              type="secondary"
            />
            <Button
              buttonType="button"
              value="Login"
              handleClick={handleLogin}
              type="secondary"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
