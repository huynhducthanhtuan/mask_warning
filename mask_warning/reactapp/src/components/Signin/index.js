import React, { useRef } from "react";
import styles from "./Signin.module.css";
import Header from "../Header";

// (Tuấn) Hàm để test API (chỉnh sửa lại cho hợp lí)
const signInAPI = (user) => {
  return fetch("/auth/signin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

// (Tuấn) Hàm để test API (chỉnh sửa lại cho hợp lí)
const submitForm = (event, user) => {
  event.preventDefault();

  signInAPI(user).then((data) => {
    if (data.error) {
      alert("Error: " + data.error);
    } else {
      localStorage.setItem("jwt", JSON.stringify(data));
      alert("Login Success");
    }
  });
};

const SignIn = () => {
  // (Tuấn) Dùng hook useRef để lấy ra DOM element của 2 thẻ input
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <>
      <Header />
      <div className={styles.main}>
        <form className={styles.form} id="form-1">
          <h2 className={styles.headingSignIn}>Sign In</h2>
          <h4 className={styles.heading}>
            Sign in and start experiencing our app!
          </h4>
          <p className={styles.desc}>
            Welcome back! Please login to your account.{" "}
          </p>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>User name</label>
            <input
              className={styles.formControl}
              type="text"
              placeholder="eg: Hamesh"
              ref={userNameInputRef}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              className={styles.formControl}
              type="text"
              placeholder="eg: *********"
              ref={passwordInputRef}
            />
          </div>
          <div className={styles.formRemind}>
            <div className={styles.formRemember}>
              <input className={styles.formControl} type="checkbox" />
              <span
                className={styles.formRememberText}
                style={{ fontSize: "14px" }}
              >
                Remember Me
              </span>
            </div>
            <span className={styles.formForgotPassword}>Forgot Password?</span>
          </div>

          <button
            type="button"
            class={`${styles.formSubmit}`}
            onClick={(e) => {
              var userName = userNameInputRef.current.value;
              var password = passwordInputRef.current.value;
              const user = {
                userName: userName,
                password: password,
              };
              submitForm(e, user);
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};
export default SignIn;
