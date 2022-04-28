import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import { updateProfile, viewProfile } from "../../apis";
import { isAuthenticated } from "../Auth";
import { toast } from "react-toastify";
import Loading from "../Helper/Loading";

const Profile = () => {
  const { user } = isAuthenticated();
  const [loadingPage, setLoadingPage] = useState(true);
  const [userInfo, setUserInfo] = useState();

  const loadViewProfile = async () => {
    const data = await viewProfile({ userId: user.userId });
    if (data.error === "User not found") {
      toast.error("User not found !!!".toLocaleUpperCase());
    } else {
      setUserInfo(data);
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    loadViewProfile();
  }, []);

  return (
    <section>
      <Header />
      <div className="d-flex">
        <ProfileSidebar userInfo={userInfo} />
        <section className="col-9">
          <div className={styles.personalInformation}>
            <img src="./icons/personalInformationImage.png"></img>
            <span>Personal Information</span>
          </div>
          {loadingPage ? (
            <Loading />
          ) : (
            <>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <p>Name: </p>
                  <p>{userInfo.fullName}</p>
                </li>

                <li className={`d-flex ${styles.item}`}>
                  <p>Email: </p>
                  <p>{userInfo.email}</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <p>Gender: </p>
                  <p>{userInfo.gender}</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <p>Store: </p>
                  <p>{userInfo.storeName}</p>
                </li>
              </ul>
              <div className={styles.personalInformation}>
                <span>Contract Information</span>
              </div>
              <ul className={styles.boxInformation}>
                <li className={`d-flex ${styles.item}`}>
                  <p>Address: </p>
                  <p>{userInfo.address}</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <p>Ward: </p>
                  <p>{userInfo.ward}</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <p>District: </p>
                  <p>{userInfo.district}</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <p>Province/City: </p>
                  <p>{userInfo.hometown}</p>
                </li>

                <li className={`d-flex ${styles.item}`}>
                  <p>Phone number: </p>
                  <p>{userInfo.phoneNumber}</p>
                </li>
              </ul>
              <Link to="/profile-change-information">
                <button className={styles.btnUpdate}>Update</button>
              </Link>
            </>
          )}
        </section>
      </div>
    </section>
  );
};

export default Profile;
