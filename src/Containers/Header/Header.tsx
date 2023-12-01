import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Button from "../../Components/Button/Button";
import useStore from "../../Hooks/UseStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersByEmail } from "../../utils/functions";
import AddUpdatePostContainer from "../AddUpdatePostContainer/AddUpdatePostContainer";
import { useEffect, useState } from "react";
import { setState } from "../../Constant/functions";

const Header = () => {
  const navigate = useNavigate();


  const [path, setPath] = useState("");
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setState(setPath, window.location.href.split("/")[3]);
    setState(setId, window.location.href.split("/")[4]);
  }, [path, id]);
  const {
    rootStore: { loginStore },
  } = useStore();

  const { data } = useQuery({
    queryKey: ["user details"],
    queryFn: () => fetchUsersByEmail(loginStore.getLoginUser),
  });

  const loggedInUserID = data?.data[0]?.id;

  loginStore.setUserID(loggedInUserID);

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
        {/* {loginStore?.getLoginUser && (
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
        )} */}
        {/* {!loginStore?.getLoginUser && (
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
        )} */}
      </div>
    </header>
  );
};

export default Header;
