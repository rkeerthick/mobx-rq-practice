import { inputProps } from "../../Types";
import './Input.scss'

const Input = ({ title, type, value, onChange, placeholder }: inputProps) => {
  return (
    <>
      <label htmlFor="">{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
