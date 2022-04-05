import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext";
import { toast } from "react-toastify";
import { codes } from "../../constants";
import { checkEmailExistApi, sendCodeViaEmail } from "../../apis";
import Header from "../Header";
import validator from "validator";
import emailjs from "emailjs-com";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [emailError, setEmailError] = useState("");
  const { code, setCode, email, setEmail } = useContext(ForgotPasswordContext);

  const validateEmail = (e) => {
    var email = emailInputRef.current.value;
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

  const handleSendCode = async (e) => {
    e.preventDefault();
    const emailInputValue = emailInputRef.current.value;

    if (emailInputValue.trim() === "") {
      toast.error("Please enter your email !!!".toLocaleUpperCase());
    } else {
      if (!validator.isEmail(emailInputValue)) {
        toast.error("Please enter an valid email !!!".toLocaleUpperCase());
      } else {
        // Kiểm tra email mà client nhập có tồn tạo trong DB ko
        const data = await checkEmailExistApi({ email: emailInputValue });

        if (data.isExistEmail) {
          setEmail(emailInputValue);

          const codeWillSend = codes[Math.floor(Math.random() * codes.length)];
          setCode(codeWillSend);
          alert("Your code: " + codeWillSend);

          // Gửi mail ở FE - dùng EmailJS (không thành công)
          // emailjs.init("EQyEVCbF1iQKVRFmH");
          // emailjs.send("service_wsbq7tf", "template_jom02bx", {
          //   message: codeWillSend,
          //   user_email: emailInputValue,
          // });

          // Request lên BE - BE gởi mail bằng smtplib (chưa thành công)
          const datas = await sendCodeViaEmail({ email: emailInputValue });
          if (data.status === "success") {
            toast.info("Please check your email !!!".toLocaleUpperCase());
          } else {
            toast.error("Errorrrr !!!".toLocaleUpperCase());
          }

          navigate("/forgot-password-enter-code");
        } else {
          toast.error("Email is not exist !!!".toLocaleUpperCase());
        }
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

      <form className={styles.form} id="contact-form">
        <h3 className={styles.formHeader}>Reset your password</h3>
        <img src="./icons/Line.png" className={styles.line}></img>
        <div>
          <label className={styles.formString}>
            Please enter your email to reset your account
          </label>
          <input
            type="email"
            name="user_email"
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
            type="submit"
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
