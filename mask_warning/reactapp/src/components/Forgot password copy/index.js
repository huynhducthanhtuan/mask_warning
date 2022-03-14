import React from "react";
import styles from "./ForgotPassword.module.css";
import Header from "../Header";
const ForgotPassword = () => {
    return (
        <section >
            < Header />
            <h1 className={styles.headerString}>Forgot Password</h1>

            <form className={styles.form}>
                <h2 className={styles.formHeader}>Reset your password</h2>
                <div >
                    <label className={styles.formString}>Please enter your email to reset your account</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    
                </div>
                <div className={styles.formButton}>
    
                    <button className={styles.buttonCancel} type="cancel" >Cancel</button>
                    <button className={styles.buttonSend} type="send-code" >Send code</button>
                </div>
                
            </form>

        </section> 
    )
}

export default ForgotPassword

