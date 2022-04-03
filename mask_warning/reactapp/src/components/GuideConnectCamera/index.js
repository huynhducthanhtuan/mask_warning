import React from "react";
import styles from "./GuideConnectCamera.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";

const GuideConnectCamera = () => {
  return (
    <section>
      <Header />
      <h1 className={styles.headerString}>Guide</h1>
      <h2 className={styles.contentString}>Connect Camera</h2>

      <div className={styles.headerGuide}>
        <div>
          <div className={styles.item}>
            <p className={styles.text}>
              1. Click on “Camera” button in header part
            </p>
            <img
              className={styles.image}
              src="./img/connect_camera_step1.png"
            ></img>
          </div>

          <div className={styles.item}>
            <p className={styles.text}>
              2. Click on “Find camera” button in Camera page
            </p>
            <img
              className={styles.image}
              src="./img/connect_camera_step2.png"
            ></img>
          </div>

          <div className={styles.item}>
            <p className={styles.text}>
              3. Click the “Connect” button on the row has your camera
            </p>
            <img
              className={styles.image}
              src="./img/connect_camera_step3.png"
            ></img>
          </div>
        </div>

        <div className={styles.item}>
          <p className={styles.text}>
            4. Fill Username and Password of Camera and click “Connect” button
          </p>
          <img
            className={styles.image2}
            src="./img/connect_camera_step4.png"
          ></img>
        </div>
      </div>

      <Link to="/guide-report-defect" className={styles.button}>
        <p className={styles.text}>Next guide 2</p>
        <img src="./icons/right-arrow.png"></img>
      </Link>
    </section>
  );
};

export default GuideConnectCamera;
