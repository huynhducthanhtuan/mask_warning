import React from "react";
import { Link } from "react-router-dom";
import styles from "./ReportHistory.module.css";
const CardReport = ({ reports }) => {
  return reports.map((report, index) => {
    return (
      <Link to={`/report-history-detail/${report.reportId}`}>
        <div className={`row ${styles.reportHistoryItem}`}>
          <div className={`col-4 ${styles.reportHistoryLeft}`}>
            <h3>#{index + 1}</h3>
            <p>{report.title}</p>
          </div>
          <div className={`col-5 ${styles.reportHistoryMiddle}`}>
            <p>{report.description}</p>
          </div>
          <div className={`co-3 ${styles.reportHistoryRight}`}>
            <p>{report.createdDate.split("T")[0]}</p>
          </div>
        </div>
      </Link>
    );
  });
};

export default CardReport;
