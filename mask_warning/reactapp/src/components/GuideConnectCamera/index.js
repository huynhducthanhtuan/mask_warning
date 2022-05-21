import React, { useEffect } from "react";
import styles from "./GuideConnectCamera.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import { PictureConnectCamera } from "../../assets/ExportImages";
import { ButtonConnectCamera } from "../../assets/ExportImages";
import { ArrowRight } from "../../assets/ExportImages";

const GuideConnectCamera = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header />
      <h2 className={styles.contentString}>1.How to connect Camera?</h2>

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
            <p className={styles.text}>2. Fill in your video stream </p>
            <img className={styles.image} src={PictureConnectCamera}></img>
          </div>

          <div className={styles.item}>
            <p className={styles.text}>
              3. Click on “Connect Camera” button in Camera page
            </p>
            <img className={styles.image} src={ButtonConnectCamera}></img>
          </div>
        </div>
      </div>

      <Link to="/guide-report-defect" className={styles.button}>
        <p className={styles.text}>Guide 2</p>
        <img src={ArrowRight}></img>
      </Link>
    </section>
  );
};

export default GuideConnectCamera;
