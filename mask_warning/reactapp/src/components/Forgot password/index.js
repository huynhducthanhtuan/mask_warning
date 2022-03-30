import React from "react";
import styles from "./ForgotPassword.module.css";
import Header from "../Header";
const ForgotPassword = () => {
    return (
        <section >
            < Header />
            <h1 className={`${styles.headerString} d-flex`}>Forgot Password</h1>

            <form className={styles.form}>
                <h3 className={styles.formHeader}>Reset your password</h3>
                <img src="./icons/Line.png" className={styles.line}></img>
                <div >
                    <label className={styles.formString}>Please enter your email to reset your account</label>
                    <input type="email" className={styles.formControl} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    
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

