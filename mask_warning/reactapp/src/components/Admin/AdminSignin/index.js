import React, { useRef, useEffect } from "react";
import styles from "./Signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInAdminAPI } from "../../../apis";

const SignInAdmin = () => {
  const navigate = useNavigate();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSignin = async (e) => {
    e.preventDefault();

    // Call API
    const data = await signInAdminAPI({
      userName: userNameInputRef.current.value,
      password: passwordInputRef.current.value,
    });

    // Xử lí kết quả trả về từ API
    switch (data.message) {
      case "Please enter all information":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter password has more 8 characters":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "User name and password do not match":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Signin failed":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Signin success":
        toast.success(data.message.toLocaleUpperCase());
        localStorage.setItem("isAdminLoggedIn", true);
        navigate("/admin/home");
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.main}>
      <form className={styles.form} id="form-1">
        <img src="../icons/logo_Horizontal.png" className={styles.logo}></img>
        <h2 className={styles.headingSignIn}>Sign In</h2>
        <p className={styles.desc}>For admin control</p>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username</label>
          <input
            className={styles.formControl}
            type="username"
            placeholder="Enter username"
            ref={userNameInputRef}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            className={styles.formControl}
            type="password"
            placeholder="Enter password"
            ref={passwordInputRef}
          />
        </div>

        <div className={styles.formRemind}>
          <div className={styles.formRemember}></div>
        </div>

        <button
          type="button"
          className={`${styles.formSubmit}`}
          onClick={handleSignin}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInAdmin;
