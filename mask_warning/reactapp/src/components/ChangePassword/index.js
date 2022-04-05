import React, { useRef, useEffect } from "react";
import styles from "./ChangePassword.module.css";
import { toast } from "react-toastify";
import { changePasswordApi } from "../../apis";
import { isAuthenticated } from "../Auth";
import Header from "../Header";

const ChangePassword = () => {
  const newPasswordInputRef = useRef();
  const oldPasswordInputRef = useRef();
  const newPasswordConfirmInputRef = useRef();

  // Khi change password thành công sẽ gọi hàm này để xóa text trong các ô input
  const cleanInputText = () => {
    oldPasswordInputRef.current.value = "";
    newPasswordInputRef.current.value = "";
    newPasswordConfirmInputRef.current.value = "";
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Lấy userId từ localStorage
    const userId = isAuthenticated().user._id || "";

    // Call API
    const data = await changePasswordApi({
      userId,
      oldPassword: oldPasswordInputRef.current.value,
      newPassword: newPasswordInputRef.current.value,
      newPasswordConfirm: newPasswordConfirmInputRef.current.value,
    });

    // Xử lí kết quả trả về từ API
    switch (data.message) {
      case "User not found":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter all information":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter passwords has more 8 characters":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter the same new password and new password confirm":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Please enter correct old password":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Change password failed":
        toast.error(data.message.toLocaleUpperCase());
        break;
      case "Change password success":
        toast.success(data.message.toLocaleUpperCase());
        cleanInputText();
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      {/*"Các bạn chỉnh lại UI, các prog "ref" giữ nguyên để các hàm xử lí ở phía trên chạy đúng"*/}
      <Header />
      <h1 className={`${styles.headerString} d-flex`}>Change password</h1>
      <img src="./icons/line.png" className={styles.lineAll}></img>
      <form className={styles.form}>
        <h3 className={styles.formHeader}>Change password</h3>
        <img src="./icons/line.png" className={styles.line}></img>
        <div>
          <input
            className={styles.formControl}
            id="old-password-input"
            placeholder="Enter old password"
            ref={oldPasswordInputRef}
          />
          <input
            className={styles.formControl}
            id="new-password-input"
            placeholder="Enter new password"
            ref={newPasswordInputRef}
          />
          <input
            className={styles.formControl}
            id="confirm-new-password-input"
            placeholder="Confirm new password"
            ref={newPasswordConfirmInputRef}
          />
        </div>

        <div className={styles.formButton}>
          <button
            className={styles.buttonSend}
            onClick={(e) => handleChangePassword(e)}
          >
            Confirm
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
