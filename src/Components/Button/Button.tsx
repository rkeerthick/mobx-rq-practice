import './Button.scss'
import { buttonProps } from "../../Types";

const Button = ({ buttonType, handleClick, value, type }: buttonProps) => {
  return (
    <button className={`${type}`} type={buttonType} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
