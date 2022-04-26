import React, { useState, useEffect } from "react";
import styles from "./ProfileSidebar.module.css";
import { Link } from "react-router-dom";
import { updateAvatar } from "../../apis";
import { isAuthenticated } from "../Auth";
import { UploadImageToFirebase } from "../Helper/UploadImageToFirebase";
const path = "user-avatars";

const ProfileSidebar = ({ userInfo }) => {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState();

  const { user } = isAuthenticated();

  useEffect(() => {
    if (!image) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);

    //upload image report to firebase storage
    UploadImageToFirebase(image, setProgress, setUrlImage, path);
  }, [image]);

  const upLoadChangeAvatar = async () => {
    await updateAvatar({ userId: user.userId, avatar: urlImage }).then(
      (result) => {
        console.log(result);
      }
    );
  };

  useEffect(() => {
    upLoadChangeAvatar();
  }, [urlImage]);

  return (
    <section className={`col-3 ${styles.profileSidebar}`}>
      <h2>Profile</h2>
      <div className={styles.boxSide}>
        {userInfo && (
          <img
            className={styles.avatarName}
            src={previewUrl ? previewUrl : userInfo.avatar}
            alt=""
          ></img>
        )}
        <div className={styles.formUploadImage}>
          <button className={`${styles.uploadBtn} btn btn-primary`}>
            {" "}
            <label for="files" className={` btn`} style={{ fontSize: "12px" }}>
              Change Avatar
            </label>
          </button>

          <input
            id="files"
            style={{ visibility: "hidden" }}
            type="file"
            className="input"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* <button>Change avatar</button> */}
        </div>

        <p className={styles.myProfile}>My Profile</p>
        <ul>
          <Link to="/profile">
            <li>
              <img src="./icons/iconProfilebar.png"></img>
              <p>Personal information</p>
            </li>
          </Link>
          <Link to="/profile-password">
            <li>
              <img src="./icons/iconProfilebar.png"></img>
              <p>Password</p>
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default ProfileSidebar;
