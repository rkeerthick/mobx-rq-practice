import { textAreaProps } from "../../Types";

const Input = ({
  title,
  rows,
  value,
  onChange,
  placeholder,
}: textAreaProps) => {
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
