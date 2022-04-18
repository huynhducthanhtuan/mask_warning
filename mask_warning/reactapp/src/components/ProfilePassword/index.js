import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePassword.module.css";
import Header from "../Header";
import ProfileSidebar from "../ProfileSidebar";

const ProfilePassword = () => {
  return (
    <div className={styles.profilePassword}>
      <Header />
      <div className="d-flex">
        <ProfileSidebar />
        <section className="col-9">
          <div className={styles.changePassword}>
            <img src="./icons/iconPeople.png"></img>
            <span>Change password</span>
          </div>
          <div className={styles.listChangePassword}>
            <ul className={styles.boxChangePassword}>
              <li className={styles.item}>
                <label>Enter old password:</label>
                <input />
              </li>
              <li className={styles.item}>
                <label>Enter new password:</label>
                <input />
              </li>
              <li className={styles.item}>
                <label>Re-enter new password:</label>
                <input />
              </li>
            </ul>
            <div
              className={` d-flex justify-content-start ${styles.btnChangePassword}`}
            >
              <button>Update</button>
              <button>Cancel</button>
            </div>
            <ul className={styles.textPassword}>
              <li>The password must meet the following conditions:</li>
              <li>
                Password should not be less than 8 characters or greater than 15
                characters
              </li>
              <li>Password should not contain whitespace characters</li>
              <li>Password should contain at least one lower case letter</li>
              <li>Password should contain at least one upper case letter</li>
              <li>Password should contain at least one numeric value</li>
              <li>
                Password should contain at least one special case characters
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePassword;
