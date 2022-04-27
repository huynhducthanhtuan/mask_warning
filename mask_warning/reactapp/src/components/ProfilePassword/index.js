import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePassword.module.css";
import Header from "../Header";
import ProfileSidebar from "../ProfileSidebar";
import { isAuthenticated } from "./../Auth/index";
import { changePasswordApi } from "../../apis";
import { toast } from "react-toastify";
import { viewProfile } from "./../../apis/index";
const ProfilePassword = () => {
  const { user } = isAuthenticated();
  const [userInfo, setUserInfo] = useState();

  const oldPassword = useRef();
  const newPassword = useRef();
  const newPasswordConfirm = useRef();
  const loadViewProfile = async () => {
    const data = await viewProfile({ userId: user.userId });
    if (data.error === "User not found") {
      toast.error("User not found !!!".toLocaleUpperCase());
    } else {
      setUserInfo(data);
      // setLoadingPage(false);
    }
  };
  useEffect(() => {
    loadViewProfile();
  }, []);
  const handleChangePassword = async () => {
    const data = {
      userId: user.userId,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
      newPasswordConfirm: newPasswordConfirm.current.value,
    };
    console.log(data);
    const result = await changePasswordApi(data);
    if (result.message) {
      toast.error(result.message);
    } else {
      toast.success(result.success);
      oldPassword.current.value = "";
      newPassword.current.value = "";
      newPasswordConfirm.current.value = "";
    }
  };

  return (
    <div className={styles.profilePassword}>
      <Header />
      <div className="container">
        <div className="row">
          <ProfileSidebar userInfo={userInfo} />
          <section className="col-9">
            <div className={styles.changePassword}>
              <img src="./icons/iconPeople.png"></img>
              <span>Change password</span>
            </div>
            <div className={styles.listChangePassword}>
              <ul className={styles.boxChangePassword}>
                <li className={styles.item}>
                  <label>Enter old password:</label>
                  <input ref={oldPassword} type="password" />
                </li>
                <li className={styles.item}>
                  <label>Enter new password:</label>
                  <input ref={newPassword} type="password" />
                </li>
                <li className={styles.item}>
                  <label>Re-enter new password:</label>
                  <input ref={newPasswordConfirm} type="password" />
                </li>
              </ul>
              <div
                className={` d-flex justify-content-start ${styles.btnChangePassword}`}
              >
                <button onClick={handleChangePassword}>Update</button>
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
    </div>
  );
};

export default ProfilePassword;
