import React from "react";
import { IButton } from "../../Types";

const Button = ({ buttonType, handleClick, value }: IButton) => {
  return (
    <button type={buttonType} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
