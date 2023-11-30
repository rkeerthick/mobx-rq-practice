import { useState } from "react";
import Button from "../Button/Button";
import "./DeletePopup.scss";
import { MdClose } from "react-icons/md";

const DeletePopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={`delete-popup ${!isOpen && "none"}`}>
      <div className="delete-popup__container">
        <div className="delete-popup__container__cls-btn-wrapper">
          <MdClose className="close-btn" onClick={handleClose} />
        </div>
        <h3 className="tx-white">
          Are you sure? Do you really want to <em>delete the post</em>?
        </h3>
        <div className="delete-popup__button-wrapper">
          <Button
            type="primary"
            value="Cancel"
            buttonType="button"
            handleClick={() => alert("cancel")}
          />
          <Button
            type="danger"
            value="Delete"
            buttonType="button"
            handleClick={() => alert("delete")}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
