import React from "react";
import styles from "./Signin.module.css"
import Header from "../Header";

const SignIn = () => {
    return (
        <>
            <Header />
            <div className={styles.main}>       
                <form className={styles.form} id="form-1">
                    <h2 className={styles.headingSignIn}>Sign In</h2>
                    <h4 className={styles.heading}>Sign in and start experiencing our app!</h4>
                    <p className={styles.desc}>Welcome  back! Please login to your account. </p>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>User name</label>
                        <input className={styles.formControl} type="text" placeholder="eg: Hamesh" />

                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Password</label>
                        <input className={styles.formControl} type="text" placeholder="eg: *********" />
                    </div>
                    <div className={styles.formRemind}>
                        <div className={styles.formRemember}>
                            <input className={styles.formControl} type="checkbox" />
                            <span className={styles.formRememberText} style={{fontSize: "14px"}}
                            >Remember Me</span>
                        </div>
                        <span className={styles.formForgotPassword}>Forgot Password?</span>
                    </div>

                    <button type="button" class={`${styles.formSubmit}`}>Sign in</button>
                </form>    
            </div>
        </>
    )
}
export default SignIn