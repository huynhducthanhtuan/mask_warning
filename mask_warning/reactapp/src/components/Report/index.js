import React, { useEffect, useRef, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../helpers/firebaseConfig/firebase";
import styles from "./Report.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import { UploadImageToFirebase } from "./../Helper/UploadImageToFirebase/index";
import { isAuthenticated } from "./../Auth/index";
import { async } from "@firebase/util";
import { sendReport } from "./../../apis/index";
import { toast } from "react-toastify";
const Report = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [urlImage, setUrlImage] = useState();
  const { user } = isAuthenticated();

  const inputTitleRef = useRef();
  const descriptionRef = useRef();
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
    UploadImageToFirebase(image, setProgress, setUrlImage);
  }, [image]);
  const formHandler = () => {
    const dataUpload = {
      userId: user.userId,
      image: urlImage,
      title: inputTitleRef.current.value,
      description: descriptionRef.current.value,
    };

    sendReport(dataUpload).then((result) => {
      toast.success(result.status);
      inputTitleRef.current.value = "";
      descriptionRef.current.value = "";
      setPreviewUrl(undefined);
    });
  };
  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      <div className={`row ${styles.camera__header}`}>
        <div className={`col-3 ${styles.sideBar}`}>
          <Link to="/report">
            <div className={`d-flex ${styles.sideBar__home}`}>
              <img src="./icons/home.png"></img>
              <p>Report</p>
            </div>
          </Link>
          <Link to="/report-history">
            <div className={`d-flex ${styles.sideBar__home}`}>
              <img src="./icons/report__history.png"></img>
              <p>Report history</p>
            </div>
          </Link>
        </div>
        <div className={`col-3 ${styles.chooseImage}`}>
          <h5>Choose image</h5>
          {previewUrl && <img src={previewUrl} alt="preview" />}
          <h2>Uploading done {progress}%</h2>
          <p className={styles.textInstruction}>
            Click "Choose File" button to upload an image:
          </p>
          <input
            type="file"
            className="input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={`col-3 ${styles.chooseImage}`}>
          <h5>Title bug</h5>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              style={{ height: "40px" }}
              ref={inputTitleRef}
            />
          </div>
        </div>
        <div className={`col-3 ${styles.reportDescription}`}>
          <div className="form-group">
            <p>Description</p>
            <textarea
              className="form-control"
              style={{ height: "123px" }}
              ref={descriptionRef}
            ></textarea>
          </div>
          <button
            className={`btn btn-outline-primary ${styles.reportBtn}`}
            onClick={formHandler}
          >
            Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default Report;
