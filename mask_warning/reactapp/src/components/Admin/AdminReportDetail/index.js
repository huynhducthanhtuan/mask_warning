import React, { useRef, useState } from "react";
import styles from "./ReportDetail.module.css"
import { Link, useParams } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import { CompleteIcon } from "../../../assets/ExportImages";

const ReportDetailAdmin = () => {

    const { reportId } = useParams()
    const exampleReport = {
        id: reportId,
        description: "Không chọn ảnh để report được.",
        image: "https://firebasestorage.googleapis.com/v0/b/mask-warning.appspot.com/o/report-images%2Fcannot-chooseimage.png?alt=media&token=37558a69-afc8-4dc6-95be-ea19d41d6081",
        createdDate: "15/01/2022",
        title: "Report error",
        isSolved: reportId === "100000000" ? true : false,
        userId: "1231434"
    }

    const solved = () => {
        if (!exampleReport.isSolved)
            return (
                <button className={styles.detailComplete}>
                    <img src={CompleteIcon} /> Complete</button>
            )
    }

    return (
        <section className={styles.homeMain}>
            <LeftControl toggle="reports" />
            <div className={exampleReport.isSolved ?
                `${styles.detailRightContent} ${styles.active}` : styles.detailRightContent}>
                <div className={styles.detailTopInformation}>
                    <h3 className={styles.detailId}>ID#{reportId}</h3>
                    <p>{exampleReport.createdDate}</p>
                </div>
                <div className={styles.detailUserInformation}>
                    <p>User ID:</p>
                    <h4>{exampleReport.userId}</h4>
                    <Link to={`/admin/reports-manager/user-detail/${exampleReport.userId}`}>
                        <button>Detail user</button>
                    </Link>
                </div>
                <div className={styles.detailImageAndTitle}>
                    <img src={exampleReport.image} />
                    <div>
                        <h2 className={exampleReport.isSolved ?
                            "d-block" : "d-none"}>You have done this task</h2>
                        <h5>{exampleReport.title}</h5>
                    </div>
                </div>
                <div className={styles.detailReport}>
                    <p>{exampleReport.description}</p>
                </div>
                {solved()}
            </div>
        </section >
    )
}
export default ReportDetailAdmin;