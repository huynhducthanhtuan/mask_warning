import React from "react";
import styles from './Modal.module.css'
function Modal({ setOpenModal, title, body = "Body", action }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {title && <div className={styles.title}>
          <h1>{title}</h1>
        </div> }
        <div className={styles.body}>
          <p>{body}</p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            onClick={action}
          >Oke</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;