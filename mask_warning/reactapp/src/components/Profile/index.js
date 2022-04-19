import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import { updateProfile, viewProfile } from "../../apis";
import { isAuthenticated } from "../Auth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = isAuthenticated();
  const [userInfo, setUserInfo] = useState();
  const loadViewProfile = async () => {
    // Lấy userId từ localStorage
    // Call API
    const data = await viewProfile({ userId: user.userId });
    // // Xử lí kết quả trả về từ API
    if (data.error === "User not found") {
      toast.error("User not found !!!".toLocaleUpperCase());
    } else {
      // data: lưu dữ liệu trả về từ API
      setUserInfo(data);
    }
  };
  useEffect(() => {
    loadViewProfile();
  }, []);
  // const handleUpdateProfile = async (e) => {
  //   e.preventDefault();

  //   // Lấy userId từ localStorage
  //   const userId = isAuthenticated().user._id || "";

  //   // Call API
  //   // Khi test thì mình truyền dữ liệu cứng vào
  //   // Các bạn cần xử lí để truyền dữ liệu người dùng nhập vào
  //   const data = await updateProfile({
  //     userId,
  //     hometown: "Quang Nam",
  //     district: "Tam Ky",
  //     address: "20 Tran Phu",
  //     storeName: "Tap hoa anh Tuan",
  //     phoneNumber: "0388791378",
  //     gender: "male",
  //   });

  //   // Xử lí kết quả trả về từ API
  //   if (data.status === "fail") {
  //     toast.error("Update failed !!!".toLocaleUpperCase());
  //   } else {
  //     toast.success("Update success !!!".toLocaleUpperCase());
  //   }
  // };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <section>
      <Header />
      <div className="d-flex">
        <ProfileSidebar />
        <section className="col-9">
          <div className={styles.personalInformation}>
            <img src="./icons/personalInformationImage.png"></img>
            <span>Personal Information</span>
          </div>
          {userInfo && (
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
                  <p>District: </p>
                  <p>{userInfo.district}</p>
                </li>
                <li className={`d-flex ${styles.item}`}>
                  <p>Province/City: </p>
                  <p>{userInfo.hometown}</p>
                </li>

                <li className={`d-flex ${styles.item}`}>
                  <p>Tell: </p>
                  <p>{userInfo.phoneNumber}</p>
                </li>
              </ul>
            </>
          )}
          <Link to="/profile-change-information">
            <button className={styles.btnUpdate}>Update</button>
          </Link>
        </section>
      </div>
    </section>
  );
};

export default Profile;
