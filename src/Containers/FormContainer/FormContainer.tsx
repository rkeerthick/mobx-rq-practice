import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { Form } from "../../Types";

const FormContainer = ({ formType }: Form) => {
  return (
    <>
      <div className="add-post">
        <div className="add-post__container">
          <span className="add-post__container__title">{formType === "login" ? "Login" : "Sign Up"}</span>
          <form>
            <div className="add-post__container__input">
              <Input
                type="text"
                title="Email ID"
                placeholder="example@gmail.com"
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
            {
              formType === "signup" && (
                <Button buttonType="button" value="Sign Up" type="primary" />
              )
            }
          </form>
        </div>
      </div>
    </>
  );
};

export default FormContainer;
