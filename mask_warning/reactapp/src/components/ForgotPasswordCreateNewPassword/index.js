import React, { useRef, useContext } from "react";
import styles from "./ForgotPasswordCreateNewPassword.module.css";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewPasswordApi } from "../../apis";
import Header from "../Header";

const ForgotPasswordCreateNewPassword = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();
  const { email, setEmail } = useContext(ForgotPasswordContext);

  const handleConfirmPasswords = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordInputRef.current.value.trim();
    const confirmNewPassword = confirmNewPasswordInputRef.current.value.trim();

    if (newPassword === "" || confirmNewPassword === "") {
      toast.error("Please enter all information !!!".toLocaleUpperCase());
    } else {
      if (newPassword.length < 8 || confirmNewPassword.length < 8) {
        toast.error(
          "Please enter passwords has more 8 characters !!!".toLocaleUpperCase()
        );
      } else {
        if (newPassword !== confirmNewPassword) {
          toast.error("Passwords do not match !!!".toLocaleUpperCase());
        } else {
          try {
            const data = await createNewPasswordApi({ email, newPassword });
            if (data.message == "success") {
              toast.success(
                "Create new password success !!!".toLocaleUpperCase()
              );
              navigate("/signin");
            } else {
              toast.error("Create new password failed !!!".toLocaleUpperCase());
            }
          } catch (e) {
            toast.error(e.toLocaleUpperCase());
          }
        }
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
