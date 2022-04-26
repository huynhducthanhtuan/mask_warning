import React from "react";
import styles from "./Modal.module.css";

function Modal({
  setOpenModal,
  Dialog,
  title,
  body = "Body",
  action,
  isCss = false,
  userDeleteId = undefined,
}) {
  return (
    <div
      className={styles.modalBackground}
      style={isCss ? { marginTop: "400px" } : { marginTop: "1px" }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <div className={styles.title}>
            <h1>{Dialog}</h1>
          </div>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {title && (
          <div className={styles.title}>
            <h1>{title}</h1>
          </div>
        )}
        <div className={`${styles.body} mt-4`}>
          <p>{body}</p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              action(userDeleteId);
              setOpenModal(false);
            }}
          >
            Oke
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
