import { ITextarea } from "../../Types";

const Input = ({ title, rows, value, onChange, placeholder }: ITextarea) => {
  return (
    <>
      <label htmlFor="">{title}</label>
      <textarea
        placeholder={placeholder}
      rows={rows}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
