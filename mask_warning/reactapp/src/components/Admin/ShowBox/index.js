import React, { useState } from "react";
import styles from '../AdminHome/Home.module.css'
import NotifyCard from '../AdminNotifyCard'
import { Bell, Dashicons } from "../../../assets/ExportImages";

const ShowBox = () => {
    const [showBox, setShowBox] = useState(false)

    const exampleUser = {
        avatar: "./img/report_user.png",
        name: "Huynh Ngoc Hieu",
      };
      const exampleReport = {
        id: "100000000",
        createdDate: "15/01/2022",
        description:
          "Website thông báo sai username và password mặc dù tôi đã nhập đúng",
        isSolved: true,
      };

    return (
        <div className={styles.homeTopRightControl}>
        <p>Admin</p>
        <div
          className={styles.homeNotify}
          onClick={() => setShowBox(!showBox)}
        >
          <img className={styles.homeIconTopRight} src={Bell} />
          <sup className={styles.homeNotifyContent}>
            <small className={styles.cartBadge}>3</small>
          </sup>
        </div>
        <div
          className={
            showBox
              ? `${styles.homeNotifyBox} d-block`
              : styles.homeNotifyBox
          }
        >
          <p className={styles.homeNotifyText}>News</p>
          <NotifyCard report={exampleReport} user={exampleUser} />
          <NotifyCard report={exampleReport} user={exampleUser} />
          <img className="d-line" src="./icons/line.png" />
          <p className={styles.homeNotifyText}>Old</p>
          <NotifyCard report={exampleReport} user={exampleUser} />
          <NotifyCard report={exampleReport} user={exampleUser} />
          <NotifyCard report={exampleReport} user={exampleUser} />
        </div>
        <img
          className={styles.homeIconTopRight}
          src={Dashicons}
        />
      </div>
    )
}

export default ShowBox