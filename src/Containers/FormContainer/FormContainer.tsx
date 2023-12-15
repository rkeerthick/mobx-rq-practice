import "./FormContainer.scss";
import { useEffect } from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { formProps, userProps } from "../../Types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../utils/functions";
import {
  setState,
  userAlreadyExist,
  userPresent,
} from "../../Constant/functions";
import { useNavigate } from "react-router-dom";
import useGetUsers from "../../Hooks/useGetUsers";
import useStore from "../../Hooks/UseStore";

const FormContainer = ({ formType }: formProps) => {
  const {
    rootStore: { loginStore },
  } = useStore();

  useEffect(() => {
    setEmail("");
  }, []);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const handleEmailChange = (e: any): void => {
  //   setEmail(e.target.value);
  // };
  const addUserMutation = useMutation({
    mutationFn: (data: userProps) => {
      return addUser(data);
    },
  });
  const { data: users } = useGetUsers();
  const handleSignUp = async () => {
    const data = {
      email: email,
      likes: [],
      dislikes: [],
    } as userProps;
    try {
      if (!userAlreadyExist(email, users?.data)) {
        await addUserMutation.mutateAsync(data);
        window.location.href = "/login";
      } else {
        alert("Email ID already exists!!!");
        setEmail("");
      }
    } catch (error: any) {}
    // navigate("/login");
  };
  const handleLogin = () => {
    if (userPresent(email, users?.data)) {
      loginStore?.setLoginUser(email);
      navigate("/");
    } else {
      alert("No such user is present");
      setEmail("");
    }
  };

  return (
    <div className="add-post">
      <div className="add-post__container">
        <span className="add-post__container__title">
          {formType === "login" ? "Login" : "Sign Up"}
        </span>
        <form>
          <div className="add-post__container__input">
            <Input
              type="text"
              title="Email ID"
              placeholder="example@gmail.com"
              value={email}
              // onChange={handleEmailChange}
              onChange={(e: any) => setState(setEmail, e.target.value)}
            />
          </div>
          {formType === "login" && (
            <>
              <Button
                buttonType="button"
                value="Login"
                type="primary"
                handleClick={handleLogin}
              />
              <p>
                Are you new??<a href="/signup">Sign Up</a>
              </p>
            </>
          )}
          {formType === "signup" && (
            <Button
              buttonType="button"
              value="Sign Up"
              type="primary"
              handleClick={handleSignUp}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
