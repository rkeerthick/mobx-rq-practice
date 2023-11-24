import './Button.scss'
import { IButton } from "../../Types";

const Button = ({ buttonType, handleClick, value, type }: IButton) => {
  return (
    <button className={`${type}`} type={buttonType} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
