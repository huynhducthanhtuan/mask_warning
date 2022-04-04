import React, { useRef, useContext, useEffect } from "react";
import styles from "./ForgotPasswordEnterCode.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext";
import { codes } from "../../constants";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import Header from "../Header";

const ForgotPasswordEnterCode = () => {
  const navigate = useNavigate();
  const enterCodeInputRef = useRef();
  const { code, setCode, email, setEmail } = useContext(ForgotPasswordContext);

  const handleReSendCode = (e) => {
    e.preventDefault();
    toast.info("Please check your email !!!".toLocaleUpperCase());

    const codeWillSend = codes[Math.floor(Math.random() * codes.length)];
    setCode(codeWillSend);
    alert("Your code: " + codeWillSend);

    emailjs.init("EQyEVCbF1iQKVRFmH");
    emailjs.send("service_wsbq7tf", "template_jom02bx", {
      message: codeWillSend,
      user_email: email,
    });
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
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
