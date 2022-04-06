import React, { useRef, useContext, useEffect } from "react";
import styles from "./ForgotPasswordCreateNewPassword.module.css";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewPasswordApi } from "../../apis";
import Header from "../Header";

const ForgotPasswordCreateNewPassword = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const newPasswordConfirmInputRef = useRef();
  const { email, setEmail } = useContext(ForgotPasswordContext);

  const cleanInputText = () => {
    newPasswordInputRef.current.value = "";
    newPasswordConfirmInputRef.current.value = "";
  };

  const handleConfirmPasswords = async (e) => {
    e.preventDefault();

    // Call API
    const data = await createNewPasswordApi({
      email: email,
      newPassword: newPasswordInputRef.current.value,
      newPasswordConfirm: newPasswordConfirmInputRef.current.value,
    });

    // Xử lí kết quả trả về từ API
    switch (data.message) {
      case "User not found":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter all information":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter passwords has more 8 characters":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter the same new password and new password confirm":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Create new password failed":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Create new password success":
        toast.success(data.message.toLocaleUpperCase());
        cleanInputText();
        navigate("/signin");
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            ref={newPasswordConfirmInputRef}
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
