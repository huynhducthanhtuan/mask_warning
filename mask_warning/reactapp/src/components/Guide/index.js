import React, { useEffect } from "react";
import styles from "./Guide.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";

const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header />
      <h1 className={styles.headerString}>Guide</h1>

      <div className={styles.headerGuide}>
        <Link to="/guide-connect-camera">
          <div>
            <img
              className={styles.image}
              src="./img/connected_camera.png"
            ></img>
            <p className={styles.contentString}>1. Connect Camera</p>
          </div>
        </Link>

        <Link to="/guide-report-defect">
          <div className={styles.item}>
            <img className={styles.image} src="./img/report_defect.png"></img>
            <p className={styles.contentString}>2. Report Defect</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Guide;
