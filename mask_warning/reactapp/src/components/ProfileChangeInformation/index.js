import React from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import styles from "./ProfileChangeInformation.module.css";
import Header from "../Header";

const ProfileChangeInformation = () => {
  return (
    <section>
      <Header />
      <div className="d-flex">
        <ProfileSidebar />
        <section className={` col-9 ${styles.boxPersonalInformation}`}>
          <div className={`d-flex ${styles.personalInformation}`}>
            <img src="./icons/personalInformationImage.png"></img>
            <span>Personal Information</span>
          </div>
          <ul className={styles.boxInformation}>
            <li className={`d-flex ${styles.item}`}>
              <label>Name: </label>
              <p>Huỳnh Ngọc Hiếu</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <label>Day of birth: </label>
              <p>01/08/2001</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <label>Email: </label>
              <p>huynhn****@gmail.com</p>
            </li>
          </ul>
          <div className={styles.fillText}>
            <span>Please fill in all the fields marked with a red * below</span>
          </div>
          <div className={styles.fillText}>
            <span>Personal information</span>
          </div>
          <ul className={styles.boxInformation}>
            <li className={`d-flex ${styles.item}`}>
              <label>Gender: </label>
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <label>Email: </label>
              <p>huynhn****@gmail.com</p>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
};

export default ProfileChangeInformation;
