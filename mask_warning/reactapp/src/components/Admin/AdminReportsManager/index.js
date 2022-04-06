import React, { useRef, useState } from "react";
import styles from "./ReportsManager.module.css"
import { Link } from "react-router-dom";
import ReportCard from "../AdminReportCard"

const ReportsManagerAdmin = (onClick) => {

    const [toggle, setToggle] = useState("all")

    //a report
    const exampleReport = {
        "id": "100000000",
        "createdDate": "15/01/2022",
        "isSolved": true
    }
    const exampleReport2 = {
        "id": "100000001",
        "createdDate": "17/01/2022",
        "isSolved": false
    }
    const exampleReport3 = {
        "id": "100000002",
        "createdDate": "20/01/2022",
        "isSolved": false
    }

    return (
        <section className={styles.reportsMain} onClick={onClick}>
            <h3>Reports List</h3>
            <div className={styles.reportsTasksTabs}>
                <p className={toggle === "all" ? `${styles.reportsTasks} ${styles.active}` : styles.reportsTasks}
                    onClick={() => setToggle("all")}> Show all tasks </p>
                <p style={{ "cursor": "default" }}>&nbsp;/&nbsp;</p>
                <p className={toggle === "solved" ? `${styles.reportsTasks} ${styles.active}` : styles.reportsTasks}
                    onClick={() => setToggle("solved")}> Show task(s) have solved </p>
                <p style={{ "cursor": "default" }}>&nbsp;/&nbsp;</p>
                <p className={toggle === "notSolved" ? `${styles.reportsTasks} ${styles.active}` : styles.reportsTasks}
                    onClick={() => setToggle("notSolved")}> Show task(s) have not solved </p>
            </div>

            <div className={styles.reportsList}>
                <Link to="/reportDetail">
                    <ReportCard report={exampleReport} />
                </Link>
                <ReportCard report={exampleReport2} />
                <ReportCard report={exampleReport3} />
            </div>
        </section>
    )
}
export default ReportsManagerAdmin;