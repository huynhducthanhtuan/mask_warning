import React, { useEffect, useState } from "react";
import styles from "./ReportHistory.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import CardReport from "./CardReport";
import { isAuthenticated } from "./../Auth/index";
import { reportsHistory } from "../../apis";

const ReportHistory = () => {
  const { user } = isAuthenticated();
  const [reports, setReports] = useState();
  const loadReportsHistory = async () => {
    await reportsHistory({ userId: user.userId }).then((reports) => {
      setReports(reports.result);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadReportsHistory();
  }, []);

  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      <div className={`row ${styles.camera__header}`}>
        <div className={`col-3 ${styles.sideBar}`}>
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
        <div className={`col-9 ${styles.reportHistory}`}>
          {reports && <CardReport reports={reports} />}
        </div>
      </div>
    </section>
  );
};

export default ReportHistory;
