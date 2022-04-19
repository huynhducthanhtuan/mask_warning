import React, { useState, useEffect } from "react";
import styles from "../AdminHome/Home.module.css";
import NotifyCard from "../AdminNotifyCard";
import { DEFAULT_NOTIFICATIONS_QUANTITY } from "../../../constants";
import { BellIcon, LogOutIcon } from "../../../assets/ExportImages";
import { viewNotificationAPI } from "../../../apis";

const ShowBox = () => {
  const [showBox, setShowBox] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsStatus, setNotificationsStatus] = useState("shortlisted");

  const getNotifications = async () => {
    const notificationQuantity =
      notificationsStatus == "shortlisted" ? DEFAULT_NOTIFICATIONS_QUANTITY : 0;

    const data = await viewNotificationAPI(notificationQuantity);
    setNotifications(data.notifications);
  };

  const renderNotifications = () => {
    return notifications.map((notification, index) => (
      <NotifyCard key={index} notification={notification} />
    ));
  };

  const handleClickSeeMore = () => {
    setNotificationsStatus("full");
  };

  const handleClickSeeLess = () => {
    setNotificationsStatus("shortlisted");
  };

  useEffect(async () => {
    await getNotifications(notificationsStatus);
  }, [notificationsStatus]);

  return (
    <div className={styles.homeTopRightControl}>
      <p>Admin</p>
      <div className={styles.homeNotify} onClick={() => setShowBox(!showBox)}>
        <img className={styles.homeIconTopRight} src={BellIcon} />
        <sup className={styles.homeNotifyContent}>
          <small className={styles.cartBadge}>4</small>
        </sup>
      </div>
      <div
        className={
          showBox ? `${styles.homeNotifyBox} d-block` : styles.homeNotifyBox
        }
      >
        {renderNotifications()}
        {notificationsStatus == "shortlisted" ? (
          <button className={styles.buttonSeeMore} onClick={handleClickSeeMore}>
            See More
          </button>
        ) : (
          <button className={styles.buttonSeeLess} onClick={handleClickSeeLess}>
            See Less
          </button>
        )}
      </div>
      <img className={styles.homeIconTopRight} src={LogOutIcon} />
    </div>
  );
};

export default ShowBox;
