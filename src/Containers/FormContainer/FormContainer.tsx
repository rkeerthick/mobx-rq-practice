import {useEffect} from 'react'
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { Form, IUser } from "../../Types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../utils/functions";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const FormContainer = ({ formType }: Form) => {
  console.log(formType, 'form type')
  useEffect(() => {setEmail('')}, [])
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e: any): void => {
    setEmail(e.target.value);
  };
  const addUserMutation = useMutation({
    mutationFn: (data: IUser) => {
      return addUser(data);
    },
  });
  const handleSignUp = async () => {
    const data = {
      id: uuid,
      email: email,
    } as IUser;
    try {
      await addUserMutation.mutateAsync(data);
    } catch (error: any) {
      console.log(error.message);
    }
    navigate("/login");
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
              onChange={handleEmailChange}
            />
          </div>
          {formType === "login" && (
            <>
              <Button buttonType="button" value="Login" type="primary" />
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
