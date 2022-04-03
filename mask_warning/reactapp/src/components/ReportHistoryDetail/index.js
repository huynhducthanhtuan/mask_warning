import React from "react";
import styles from "./ReportHistoryDetail.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";

const ReportHistoryDetail = () => {
  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      <div className={`container ${styles.reportHistoryDetail}`}>
        <Link to="/report-history">
          <div className={styles.reportHistoryBack}>
            <img src="./icons/arrow_back.png"></img>
            <p>Back</p>
          </div>
        </Link>
        <div
          className={`d-flex justify-content-between ${styles.reportHistoryDetailContent}`}
        >
          <div className={styles.reportHistoryDetailLeft}>
            <h3>Report #1</h3>
            <p>Speaker error</p>
          </div>
          <div className={styles.reportHistoryDetailRight}>
            <p>22:12 10/01/2022</p>
          </div>
        </div>
        <div className={styles.reportHistoryDetailText}>
          <p>
            The notify of speaker is wrong. That person is wearing mask but it
            won’t stop say wear mask on
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReportHistoryDetail;
