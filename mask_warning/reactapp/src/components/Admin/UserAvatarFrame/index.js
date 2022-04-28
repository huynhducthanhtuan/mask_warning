import React, { useState, useEffect } from "react";
import styles from "./UserAvatarFrame.module.css";
import { updateAvatar } from "../../../apis";
import { isAuthenticated } from "../../Auth";
import { UploadImageToFirebase } from "../../Helper/UploadImageToFirebase";
const path = "user-avatars";

const UserAvatarFrame = ({ userInfo, enableChangeAvatar }) => {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState();

  const upLoadChangeAvatar = async () => {
    await updateAvatar({ userId: userInfo.userId, avatar: urlImage });
  };

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

  useEffect(() => {
    upLoadChangeAvatar();
  }, [urlImage]);

  return (
    <section className={`col-3 ${styles.profileSidebar}`}>
      <div className={styles.boxSide}>
        {userInfo && (
          <img
            className={styles.avatarName}
            src={previewUrl ? previewUrl : userInfo.avatar}
            alt=""
          ></img>
        )}
        {enableChangeAvatar && (
          <div className={styles.formUploadImage}>
            <button className={`${styles.uploadBtn} btn btn-primary`}>
              <label
                for="files"
                className={` btn`}
                style={{ fontSize: "12px" }}
              >
                Change User Avatar
              </label>
            </button>
            <input
              id="files"
              style={{ visibility: "hidden" }}
              type="file"
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAvatarFrame;
