import React, {useRef, useState} from "react";
import styles from "./Signin.module.css"
import Header from "../Header";
import {signInAPI} from './apiSignin'
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";
import { authenticate } from '../Auth/index'
const SignIn = () => {
    const navigate = useNavigate()
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();
    
    const [redirect, setRedirect ] = useState(false)

    const submitForm = (event, user) => {
        event.preventDefault();
    
        signInAPI(user).then((data) => {
          if (data.error) {
            toast.error(data.error,{pauseOnHover: true,})
          } else {
            toast.success("Login Success!")
          
            authenticate(data, () => {
                setRedirect(true)
            })
          }
        });
    };
    const redirectToHome = () => {
        if(redirect)
            return navigate('/')
    }


    return (
        <>
        {redirectToHome()}
            <Header />
            <div className={styles.main}>
                <form className={styles.form} id="form-1">
                    <h2 className={styles.headingSignIn}>Sign In</h2>
                    <h4 className={styles.heading}>Sign in and start experiencing our app!</h4>
                    <p className={styles.desc}>Welcome  back! Please login to your account. </p>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>User name</label>
                        <input className={styles.formControl} type="text" placeholder="eg: Hamesh"
                            ref={userNameInputRef}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Password</label>
                        <input className={styles.formControl} type="password" placeholder="eg: *********"
                            ref={passwordInputRef}
                        />
                    </div>
                    <div className={styles.formRemind}>
                        <div className={styles.formRemember}>
                            <input className={styles.formControl} type="checkbox" />
                            <span className={styles.formRememberText} style={{fontSize: "14px"}}
                            >Remember Me</span>
                        </div>
                        <span className={styles.formForgotPassword}>Forgot Password?</span>
                    </div>

                    <button type="button"
                        className={`${styles.formSubmit}`}
                        onClick={(e) => {
                            var userName = userNameInputRef.current.value;
                            var password = passwordInputRef.current.value;
                            const user = {
                                userName: userName,
                                password: password
                            }
                            submitForm(e, user);
                        }}
                    >Sign in</button>
                </form>    
            </div>
        </>
    )
}
export default SignIn