import React, { useRef } from "react";
import styles from "./Signin.module.css"
import { Link } from "react-router-dom";

const SignInAdmin = () => {
    return (

        <div className={styles.main}>
            <form className={styles.form} id="form-1">
                <img src="../icons/logo_Horizontal.png" className={styles.logo}></img>
                <h2 className={styles.headingSignIn}>Sign In</h2>
                <p className={styles.desc}>For admin control</p>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input
                        className={styles.formControl}
                        type="email"
                        placeholder="Enter email"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <input
                        className={styles.formControl}
                        type="password"
                        placeholder="Enter password"
                    />
                </div>

                <div className={styles.formRemind}>
                    <div className={styles.formRemember}>
                    </div>
                </div>

                <button
                    type="button"
                    className={`${styles.formSubmit}`}

                >
                    Sign in
                </button>
            </form>
        </div>


    )
}
export default SignInAdmin;

