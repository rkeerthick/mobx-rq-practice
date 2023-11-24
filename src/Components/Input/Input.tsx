import { IInput } from "../../Types";
import './Input.scss'

const Input = ({ title, type, value, onChange, placeholder }: IInput) => {
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
