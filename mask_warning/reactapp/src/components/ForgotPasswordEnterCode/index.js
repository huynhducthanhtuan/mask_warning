import React, { useRef, useContext, useEffect } from "react";
import styles from "./ForgotPasswordEnterCode.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext";
import { resendCodeApi, submitCodeApi } from "../../apis";
import { toast } from "react-toastify";
import Header from "../Header";

const ForgotPasswordEnterCode = () => {
  const navigate = useNavigate();
  const codeInputRef = useRef();
  const { code, setCode, email, setEmail } = useContext(ForgotPasswordContext);

  const cleanInputText = () => {
    codeInputRef.current.value = "";
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();

    // Call API
    const data = await submitCodeApi({
      email: email,
      code: codeInputRef.current.value,
    });

    // Xử lí kết quả trả về từ API
    switch (data.message) {
      case "Please enter code":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "You were enter wrong code":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Correct code":
        toast.success(data.message.toLocaleUpperCase());
        navigate("/forgot-password-create-new-password");
        break;
    }
  };

  const handleReSendCode = async (e) => {
    e.preventDefault();

    // Call API
    const data = await resendCodeApi({ email });

    // Xử lí kết quả trả về từ API
    switch (data.message) {
      case "Failed to re-send code":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please check your email":
        toast.success(data.message.toLocaleUpperCase());
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
      <img src="../icons/line.png" className={styles.lineAll}></img>
      <form className={styles.form}>
        <h3 className={styles.formHeader}>Reset your password</h3>
        <img src="../icons/line.png" className={styles.line}></img>
        <div>
          <h4>Enter the code here</h4>
          <input
            className={styles.formControl}
            id="inputCode"
            placeholder="Enter code"
            ref={codeInputRef}
          />
        </div>

        <div className={styles.formButton}>
          <button
            className={styles.buttonCancel}
            type="re-send"
            onClick={(e) => handleReSendCode(e)}
          >
            Re-send
          </button>
          <button
            className={styles.buttonSend}
            type="ok"
            onClick={(e) => handleSubmitCode(e)}
          >
            OK
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordEnterCode;
