import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import Header from "../Header";
import { updateProfile, viewProfile } from "../../apis";
import { isAuthenticated } from "../Auth";
import { toast } from "react-toastify";

const Profile = () => {
  const handleViewProfile = async (e) => {
    e.preventDefault();

    // Lấy userId từ localStorage
    const userId = isAuthenticated().user._id || "";

    // Call API
    const data = await viewProfile({ userId });

    // Xử lí kết quả trả về từ API
    if (data.error == "User not found") {
      toast.error("User not found !!!".toLocaleUpperCase());
    } else {
      // data: lưu dữ liệu trả về từ API
      console.log(data);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Lấy userId từ localStorage
    const userId = isAuthenticated().user._id || "";

    // Call API
    // Khi test thì mình truyền dữ liệu cứng vào
    // Các bạn cần xử lí để truyền dữ liệu người dùng nhập vào
    const data = await updateProfile({
      userId,
      hometown: "Quang Nam",
      district: "Tam Ky",
      address: "20 Tran Phu",
      storeName: "Tap hoa anh Tuan",
      phoneNumber: "0388791378",
      gender: "male",
    });

    // Xử lí kết quả trả về từ API
    if (data.status == "fail") {
      toast.error("Update failed !!!".toLocaleUpperCase());
    } else {
      toast.success("Update success !!!".toLocaleUpperCase());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header />
      <form className={styles.form}>
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
      </form>
    </section>
  );
};

export default Profile;
