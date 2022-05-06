import React, { useRef, useState, useEffect } from "react";
import styles from "./ReportsManager.module.css";
import { Link } from "react-router-dom";
import { viewReportList } from "../../../apis";
import LeftControl from "../AdminLeftControl";
import ReportCard from "../AdminReportCard";
import ShowBox from "../ShowBox";
import Loading from "../../Helper/Loading";
import Frame from "../Frame";
import { LoadingUserManage } from "../../../assets/ExportImages";

const ReportsManagerAdmin = (onClick) => {
  const [toggle, setToggle] = useState("all");
  const [reports, setReports] = useState();

  const loadViewReportList = async () => {
    await viewReportList().then((data) => {
      setReports(data.result);
    });
  };

  useEffect(() => {
    loadViewReportList();
  }, []);

  var reportsFilter =
    reports &&
    reports.filter((report) => {
      if (toggle === "all") return report;
      if (toggle === "solved") return report.isSolved;
      return !report.isSolved;
    });

  return (
    <Frame titleToggle="reports" >
      {reports ? (
        <>
          <h3 className={styles.reportsTitle}>Reports List</h3>
          <div className={styles.reportsTasksTabs}>
            <p
              className={
                toggle === "all"
                  ? `${styles.reportsTasks} ${styles.active}`
                  : styles.reportsTasks
              }
              onClick={() => setToggle("all")}
            >
              {" "}
              Show all tasks{" "}
            </p>
            <p style={{ cursor: "default" }}>&nbsp;/&nbsp;</p>
            <p
              className={
                toggle === "solved"
                  ? `${styles.reportsTasks} ${styles.active}`
                  : styles.reportsTasks
              }
              onClick={() => setToggle("solved")}
            >
              {" "}
              Show task(s) have solved{" "}
            </p>
            <p style={{ cursor: "default" }}>&nbsp;/&nbsp;</p>
            <p
              className={
                toggle === "notSolved"
                  ? `${styles.reportsTasks} ${styles.active}`
                  : styles.reportsTasks
              }
              onClick={() => setToggle("notSolved")}
            >
              {" "}
              Show task(s) have not solved{" "}
            </p>
          </div>

          <div className={styles.reportsList}>
            {reports && <ReportCard reports={reportsFilter} />}
          </div>
        </>
      ) : (

        <div className={` col-10 `}>
          <Loading srcIcon={LoadingUserManage} />
        </div>
      )}

    </Frame>
  );
};
export default ReportsManagerAdmin;
