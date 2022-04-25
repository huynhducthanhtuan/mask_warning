import React, { useEffect } from "react";
import styles from "./GuideReportDefect.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../../assets/ExportImages";
import { ChooseImage } from "../../assets/ExportImages";
import { TitleBug } from "../../assets/ExportImages";
import { Description } from "../../assets/ExportImages";
import { SendReport1 } from "../../assets/ExportImages";

const GuideReportDefect = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header />
      <h2 className={styles.contentString}>
        2. How to send the report to the admin
      </h2>

      <div className={styles.headerGuide}>
        <div>
          <div>
            <p className={styles.text}>1. Choose the image error if you have</p>
            <img className={styles.image} src={ChooseImage}></img>
          </div>

          <div>
            <p className={styles.text}>2. Choose type of bug</p>
            <img className={styles.image} src={TitleBug}></img>
          </div>
        </div>

        <div className={styles.item}>
          <div>
            <p className={styles.text}>3. Describe detail about the defect</p>
            <img className={styles.image2} src={Description}></img>
          </div>

          <div>
            <p className={styles.text}>
              4. If you want to send report, please click button "send report"
            </p>
            <img src={SendReport1}></img>
          </div>
        </div>
      </div>

      <Link to="/guide-connect-camera" className={styles.button}>
        <img src={ArrowLeft}></img>
        <p className={styles.text}>Previous guide 1</p>
      </Link>
    </section>
  );
};

export default GuideReportDefect;
