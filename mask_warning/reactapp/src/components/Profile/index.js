import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import Header from "../Header";
import ProfileSidebar from "../ProfileSidebar";
import { updateProfile, viewProfile } from "../../apis";
import { isAuthenticated } from "../Auth";
import { toast } from "react-toastify";

const Profile = () => {
  // const handleViewProfile = async (e) => {
  //   e.preventDefault();

  //   // Lấy userId từ localStorage
  //   const userId = isAuthenticated().user._id || "";

  //   // Call API
  //   const data = await viewProfile({ userId });

  //   // Xử lí kết quả trả về từ API
  //   if (data.error === "User not found") {
  //     toast.error("User not found !!!".toLocaleUpperCase());
  //   } else {
  //     // data: lưu dữ liệu trả về từ API
  //     console.log(data);
  //   }
  // };

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
      {/* <form className={styles.form}>
        <h3 className={styles.formHeader}>Update Profile</h3>
        <button
          className={styles.buttonSend}
          onClick={(e) => handleViewProfile(e)}
        >
          View Profile
        </button>
        <button
          className={styles.buttonSend}
          onClick={(e) => handleUpdateProfile(e)}
        >
          Update Profile
        </button>
      </form> */}
      <div className="d-flex">
        <ProfileSidebar />
        <section className="col-9">
          <div className={styles.personalInformation}>
            <img src="./icons/personalInformationImage.png"></img>
            <span>Personal Information</span>
          </div>
          <ul className={styles.boxInformation}>
            <li className={`d-flex ${styles.item}`}>
              <p>Name: </p>
              <p>Huỳnh Ngọc Hiếu</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Day of birth: </p>
              <p>01/08/2001</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Email: </p>
              <p>huynh***@gmail.com</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Gender: </p>
              <p>Male</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Store: </p>
              <p>BeautyShop</p>
            </li>
          </ul>
          <div className={styles.personalInformation}>
            <span>Contract Information</span>
          </div>
          <ul className={styles.boxInformation}>
            <li className={`d-flex ${styles.item}`}>
              <p>Address: </p>
              <p>297 Phạm Ngũ Lão</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>District: </p>
              <p>Hải Châu</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Province/City: </p>
              <p>Đà Nẵng</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Country: </p>
              <p>Việt Nam</p>
            </li>
            <li className={`d-flex ${styles.item}`}>
              <p>Tel: </p>
              <p>0376543210</p>
            </li>
          </ul>
          <button className={styles.btnUpdate}>Update</button>
        </section>
      </div>
    </section>
  );
};

export default Profile;
