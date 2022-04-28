import React, { useEffect } from "react";
import styles from "./Guide.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import 'animate.css';
const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header />
      <div className={styles.guideBackground}>
        <h1 className={`animate__animated animate__headShake animate__delay-1s  ${styles.headerString}`}>Welcome to mask warning </h1>
        <h3>
          Hello everyone who has come to our tutorial page. Here are two
          tutorials about our main function
        </h3>
        <div className={styles.headerGuide}>
          <Link to="/guide-connect-camera">
            <div className={`animate__animated animate__backInLeft animate__delay-1s ${styles.item}`}>
              <p className={styles.contentString}>
                1. How to connect camera IP with Mask Warning Website?
              </p>
            </div>
          </Link>

          <Link to="/guide-report-defect">
            <div className={`animate__animated animate__backInLeft animate__delay-2s ${styles.item}`}>
              <p className={styles.contentString}>
                2. How to send the report to the admin?
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Guide;
