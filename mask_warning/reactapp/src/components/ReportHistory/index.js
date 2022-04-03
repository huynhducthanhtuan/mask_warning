import React from "react"
import styles from "./ReportHistory.module.css"
import Header from "../Header"
import { Link } from "react-router-dom"
const Camera = () => {

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
                    <Link to="/report-history-detail">
                        <div className={`row ${styles.reportHistoryItem}`}>
                            <div className={`col-4 ${styles.reportHistoryLeft}`}>
                                <h3>Report #1</h3>
                                <p>Speaker error</p>
                            </div>
                            <div className={`col-5 ${styles.reportHistoryMiddle}`}>
                                <p>The notify of speaker is wrong. That person ...</p>
                            </div>
                            <div className={`co-3 ${styles.reportHistoryRight}`} >
                                <p>22:12 10/01/2022</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Camera

