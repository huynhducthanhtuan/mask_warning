import React, { useRef, useState, useContext } from "react";
import styles from "./Signin.module.css";
import Header from "../Header";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signInAPI } from "../../apis";
import { authenticate } from "../Auth";
import { UserContext } from "../../App";

const SignIn = () => {
  const navigate = useNavigate();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const { state, dispatch } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const submitForm = (event, user) => {
    event.preventDefault();

    signInAPI(user).then((data) => {
      if (data.error) {
        toast.error(data.error.toUpperCase(), { pauseOnHover: true });
      } else {
        toast.success("Login Success !!!".toLocaleUpperCase());

        authenticate(data, () => {
          dispatch({ type: "USER", payload: data.user });
          setRedirect(true);
        });
      }
    });
  };

  const redirectToHome = () => {
    if (redirect) return navigate("/");
  };

  return (
    <>
      {redirectToHome()}
      <Header />
      <div className={styles.main}>
        <form className={styles.form} id="form-1">
          <h2 className={styles.headingSignIn}>Sign In</h2>
          <h4 className={styles.heading}>
            Sign in and start experiencing our app!
          </h4>
          <p className={styles.desc}>
            Welcome back! Please signin to your account.{" "}
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
              type="password"
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
            <Link to="/forgot-password" className={styles.formForgotPassword}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            className={`${styles.formSubmit}`}
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
