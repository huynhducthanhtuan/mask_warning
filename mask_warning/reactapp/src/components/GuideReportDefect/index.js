import React from "react";
import styles from "./GuideReportDefect.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";

const GuideReportDefect = () => {
  return (
    <section>
      <Header />
      <h1 className={styles.headerString}>Guide</h1>
      <h2 className={styles.contentString}>Connect Camera</h2>

      <div className={styles.headerGuide}>
        <div>
          <div>
            <p className={styles.text}>1. Choose the image error if you have</p>
            <img
              className={styles.image}
              src="./img/report_defect_step1.png"
            ></img>
          </div>

          <div>
            <p className={styles.text}>2. Choose type of bug</p>
            <img
              className={styles.image}
              src="./img/report_defect_step2.png"
            ></img>
          </div>
        </div>

        <div className={styles.item}>
          <div>
            <p className={styles.text}>3. Describe detail about the defect</p>
            <img
              className={styles.image2}
              src="./img/report_defect_step3.png"
            ></img>
          </div>

          <div>
            <p className={styles.text}>
              4. If you want to clear all contents click "Clear" or if you want
              to send report click "Report"
            </p>
            <img src="./img/report_defect_step4.png"></img>
            <img src="./img/report_defect_step5.png"></img>
          </div>
        </div>
      </div>

      <Link to="/guide-connect-camera" className={styles.button}>
        <img className={styles.routeIcon} src="./icons/right-arrow.png"></img>
        <p className={styles.text}>Previous guide 1</p>
      </Link>
    </section>
  );
};

export default GuideReportDefect;
