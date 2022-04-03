import React, { useRef } from "react";
import styles from "./ForgotPasswordCreateNewPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Header";

const ForgotPasswordCreateNewPassword = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();

  const handleConfirmPasswords = (e) => {
    e.preventDefault();

    const newPassword = newPasswordInputRef.current.value;
    const confirmNewPassword = confirmNewPasswordInputRef.current.value;

    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      toast.error("Please enter all information !!!".toLocaleUpperCase());
    } else {
      if (newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match !!!".toLocaleUpperCase());
      } else {
        toast.success("Create new password sucess !!!".toLocaleUpperCase());
        // request gửi userId và newPassword lên API BE
        navigate("/signin");
      }
    }
  };

  return (
    <section>
      <Header />
      <h1 className={`${styles.headerString} d-flex`}>Forgot Password</h1>
      <img src="./icons/line.png" className={styles.lineAll}></img>
      <form className={styles.form}>
        <h3 className={styles.formHeader}>Set your new password</h3>
        <img src="./icons/line.png" className={styles.line}></img>
        <div>
          <input
            className={styles.formControl}
            id="new-password-input"
            placeholder="Enter new password"
            ref={newPasswordInputRef}
          />
          <input
            className={styles.formControl}
            id="confirm-new-password-input"
            placeholder="Confirm new password"
            ref={confirmNewPasswordInputRef}
          />
        </div>

        <div className={styles.formButton}>
          <button
            className={styles.buttonSend}
            onClick={(e) => handleConfirmPasswords(e)}
          >
            Confirm
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordCreateNewPassword;
