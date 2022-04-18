import React, { useRef, useState } from "react";
import styles from "./ReportsManager.module.css";
import { Link } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import ReportCard from "../AdminReportCard";
import ShowBox from "../ShowBox";

const ReportsManagerAdmin = (onClick) => {
  const [toggle, setToggle] = useState("all");

  //a report
  const exampleReport = {
    id: "100000000",
    createdDate: "15/01/2022",
    isSolved: true,
    userId: "1231434",
  };
  const exampleReport2 = {
    id: "100000001",
    createdDate: "17/01/2022",
    isSolved: false,
    userId: "12334566",
  };
  const exampleReport3 = {
    id: "100000002",
    createdDate: "20/01/2022",
    isSolved: false,
    userId: "12764866",
  };

  const arrayRp = [exampleReport, exampleReport2, exampleReport3];

  var reportsFilter = arrayRp.filter((report) => {
    if (toggle === "all") return report;
    if (toggle === "solved") return report.isSolved;
    return !report.isSolved;
  });

  return (
    <section className={styles.reportsMain}>
      <LeftControl toggle="reports" />
      <div className={styles.reportsRight}>
        <ShowBox />
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
          <ReportCard reports={reportsFilter} />
        </div>
      </div>
    </section>
  );
};
export default ReportsManagerAdmin;
