import React from "react";
import { createPortal } from "react-dom";
import { modalProps } from "../../Types";

import { css } from "@emotion/css";
const MODAL_STYLES_DANGER = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#b66f6f",
  padding: "20px",
  borderRadius: "8px",
  zIndex: 1000,
});

const MODAL_STYLES_WARNING = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#d08f4d",
  padding: "20px",
  borderRadius: "8px",
  zIndex: 1000,
});

const OVERLAY_STYLES = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
});

const Modal = ({ children, isOpen, type }: modalProps) => {
  return isOpen
    ? createPortal(
        <>
          <div className={OVERLAY_STYLES}></div>
          <div
            className={
              type === "danger" ? MODAL_STYLES_DANGER : MODAL_STYLES_WARNING
            }
          >
            {children}
          </div>
        </>,
        document.getElementById("modal")!
      )
    : null;
};

export default Modal;
