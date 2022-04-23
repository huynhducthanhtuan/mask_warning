import React, { useEffect, useState } from "react";
import styles from "./ReportHistoryDetail.module.css";
import Header from "../Header";
import { Link, useParams } from "react-router-dom";
import { ArrowBack } from "../../assets/ExportImages";
import { viewReportDetail } from "./../../apis/index";
const ReportHistoryDetail = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState();

  const loadReportDetail = async () => {
    await viewReportDetail({ reportId }).then((data) => {
      setReport(data);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadReportDetail();
  }, []);
  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      {report && (
        <div className={`container ${styles.reportHistoryDetail}`}>
          <Link to="/report-history">
            <div className={styles.reportHistoryBack}>
              <img src={ArrowBack}></img>
              <p>Back</p>
            </div>
          </Link>
          <div
            className={`d-flex justify-content-between ${styles.reportHistoryDetailContent}`}
          >
            <div className={styles.reportHistoryDetailLeft}>
              <h3>Report #1</h3>
              <p>{report.title}</p>
            </div>
            <div className={styles.reportHistoryDetailRight}>
              <p>{report.createdDate.split("T")[0]}</p>
            </div>
          </div>
          <div className={styles.reportHistoryDetailText}>
            <p>{report.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportHistoryDetail;
