import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { toast } from "react-toastify";
import Header from "../Header";
import validator from "validator";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const emailInputRef = useRef();

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("Valid Email :)");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    emailInputRef.current.value = "";
  };

  const handleSendCode = (e) => {
    e.preventDefault();

    const emailInputValue = emailInputRef.current.value;

    if (emailInputValue.trim() === "") {
      toast.error("Please enter your email !!!".toLocaleUpperCase());
    } else {
      if (!validator.isEmail(emailInputValue)) {
        toast.error("Please enter an valid email !!!".toLocaleUpperCase());
      } else {
        navigate("/forgot-password-enter-code");
      }
    }
  };

  return (
    <section>
      <Header />
      <h1 className={`${styles.headerString} d-flex`}>Forgot Password</h1>

      <form className={styles.form}>
        <h3 className={styles.formHeader}>Reset your password</h3>
        <img src="./icons/Line.png" className={styles.line}></img>
        <div>
          <label className={styles.formString}>
            Please enter your email to reset your account
          </label>
          <input
            type="email"
            className={styles.formControl}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={emailInputRef}
            onChange={(e) => validateEmail(e)}
          />
        </div>

        <div className={styles.formButton}>
          <button
            className={styles.buttonCancel}
            type="cancel"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </button>
          <button
            className={styles.buttonSend}
            type="send-code"
            onClick={(e) => handleSendCode(e)}
          >
            Send code
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
