import React, { useRef } from "react";
import styles from "./ForgotPasswordEnterCode.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Header";

const ForgotPasswordEnterCode = () => {
  const navigate = useNavigate();
  const enterCodeInputRef = useRef();

  const handleReSendCode = (e) => {
    e.preventDefault();

    toast.info("Re-enter code after 20 secs !!!".toLocaleUpperCase());
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();

    const code = "123";
    const enterCodeInputValue = enterCodeInputRef.current.value;

    if (enterCodeInputValue.trim() === "") {
      toast.error("Please enter code !!!".toLocaleUpperCase());
    } else {
      if (enterCodeInputValue.trim() !== code) {
        toast.error("You were enter wrong code !!!".toLocaleUpperCase());
      } else {
        navigate("/forgot-password-create-new-password");
      }
    }
  };

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
            ref={enterCodeInputRef}
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
