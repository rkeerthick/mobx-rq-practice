import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Button from "../Button/Button";
import useStore from "../../Hooks/UseStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersByEmail } from "../../utils/functions";

const Header = () => {
  const navigate = useNavigate();
  const {
    rootStore: { loginStore },
  } = useStore();
    
  const { data } = useQuery({
    queryKey: ["user details"],
    queryFn: () => fetchUsersByEmail(loginStore.getLoginUser),
  });

  const loggedInUserID = data?.data[0]?.id;
  const loggedInEmail = data?.data[0]?.email;

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

  const handleLogout = () => {
    loginStore?.setLogoutUser();
    navigate("/login");
  };

  return (
    <header>
      <div className="header">
        <h1 onClick={handlePostClick}>Posts</h1>
        {loggedInEmail && (
          <div className="header__container">
            <h3>Hello, {loggedInUserID}</h3>
            <Button
              buttonType="button"
              value="Add Post"
              handleClick={handleAddClick}
              type="secondary"
            />
            <Button
              buttonType="button"
              value="Logout"
              handleClick={handleLogout}
              type="secondary"
            />
          </div>
        )}
        {!loggedInEmail && (
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
