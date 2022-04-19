import React, { useState, useEffect } from "react";
import styles from "../AdminHome/Home.module.css";
import NotifyCard from "../AdminNotifyCard";
import { Bell, Dashicons } from "../../../assets/ExportImages";

import { isAuthenticated } from "./../../Auth/index";
import {
  BellIcon,
  ReportUserImage,
  LogOutIcon,
} from "../../../assets/ExportImages";
import { notifications } from "../../../apis";

const ShowBox = () => {
  const [showBox, setShowBox] = useState(false);
  const [notifys, setNotifys] = useState();
  const loadNotifications = async () => {
    const res = await notifications();
    setNotifys(res.notifications);
  };
  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className={styles.homeTopRightControl}>
      <p>Admin</p>
      <div className={styles.homeNotify} onClick={() => setShowBox(!showBox)}>
        <img className={styles.homeIconTopRight} src={BellIcon} />
        <sup className={styles.homeNotifyContent}>
          <small className={styles.cartBadge}>3</small>
        </sup>
      </div>
      <div
        className={
          showBox ? `${styles.homeNotifyBox} d-block` : styles.homeNotifyBox
        }
      >
        <p className={styles.homeNotifyText}>News</p>
        {notifys && <NotifyCard notifys={notifys} />}
        {/* <img className="d-line" src="./icons/line.png" />
        <p className={styles.homeNotifyText}>Old</p> */}
      </div>
      <img className={styles.homeIconTopRight} src={LogOutIcon} />
    </div>
  );
};

export default ShowBox;
