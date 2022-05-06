import React, { useEffect, useRef, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../helpers/firebaseConfig/firebase";
import styles from "./Report.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import { UploadImageToFirebase } from "./../Helper/UploadImageToFirebase/index";
import { isAuthenticated } from "./../Auth/index";
import { sendReport } from "./../../apis";
import { toast } from "react-toastify";
const path = "report-images";

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
    UploadImageToFirebase(image, setProgress, setUrlImage, path);
  }, [image]);

  const formHandler = async () => {
    const dataUpload = {
      userId: user.userId,
      image: urlImage || "",
      title: inputTitleRef.current.value,
      description: descriptionRef.current.value,
    };

    const data = await sendReport(dataUpload);
    switch (data.message) {
      case "Please enter valid all information":
        toast.error(data.message.toUpperCase());
        break;
      case "failed":
        toast.error("SEND REPORT FAILED");
        break;
      case "success":
        toast.success("SEND REPORT SUCCESS");
        inputTitleRef.current.value = "";
        descriptionRef.current.value = "";
        setPreviewUrl(undefined);
        break;
    }
  };

  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      <div className={`container ${styles.cameraContainer}`}>
        <div className={`row ${styles.camera__header}`}>
          <div
            className={`col-3 animate__animated animate__bounceIn animate__delay-1s ${styles.sideBar}`}
          >
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
          <div
            className={`col-3 animate__animated animate__backInRight animate__delay-1s ${styles.chooseImage}`}
          >
            <h5>Choose image</h5>
            <img
              src={previewUrl ? previewUrl : "./img/imageDefault.jpg"}
              alt="preview"
            />

            <p className={styles.textInstruction}>
              Click "Choose File" button to upload an image:
            </p>
            <input
              type="file"
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div
            className={`col-3 animate__animated animate__backInRight animate__delay-2s ${styles.chooseImage}`}
          >
            <h5>Title bug</h5>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${styles.titleBug}`}
                style={{ height: "40px" }}
                ref={inputTitleRef}
                placeholder="Title bug"
              />
            </div>
          </div>
          <div
            className={`col-3 animate__animated animate__backInRight animate__delay-3s ${styles.reportDescription}`}
          >
            <div className="form-group">
              <p>Description</p>
              <textarea
                className={`form-control ${styles.descBug}`}
                style={{ height: "123px" }}
                ref={descriptionRef}
                placeholder="Description bug"
              ></textarea>
            </div>
            <button
              className={`btn btn-outline-primary ${styles.reportBtn}`}
              onClick={formHandler}
            >
              Send Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
