import React, { useState, useEffect } from "react";
import styles from "../AdminHome/Home.module.css";
import NotifyCard from "../AdminNotifyCard";
import { useNavigate } from "react-router-dom";
import { DEFAULT_NOTIFICATIONS_QUANTITY } from "../../../constants";
import { BellIcon, LogOutIcon } from "../../../assets/ExportImages";
import {
  viewNotificationAPI,
  countNewNotificationsQuantityAPI,
} from "../../../apis";

const ShowBox = () => {
  const [showBox, setShowBox] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationsQuantity, setNewNotificationsQuantity] = useState();
  const navigatate = useNavigate();

  const getNotifications = async () => {
    const data = await viewNotificationAPI(DEFAULT_NOTIFICATIONS_QUANTITY);
    setNotifications(data.notifications);
  };

  const renderNotifications = () => {
    return notifications.map((notification, index) => (
      <NotifyCard key={index} notification={notification} />
    ));
  };

  const getNewNotificationsQuantity = async () => {
    const data = await countNewNotificationsQuantityAPI();
    setNewNotificationsQuantity(data.quantity);
  };

  const renderNewNotificationsQuantity = () => {
    return (
      newNotificationsQuantity && (
        <sup className={styles.homeNotifyContent}>
          <small className={styles.cartBadge}>{newNotificationsQuantity}</small>
        </sup>
      )
    );
  };

  const handleClickSeeMore = () => {
    navigatate("/admin/reports-manager");
  };

  useEffect(async () => {
    await getNotifications();
  }, []);

  useEffect(async () => {
    await getNewNotificationsQuantity();
  }, []);

  return (
    <div className={styles.homeTopRightControl}>
      <p>Admin</p>
      <div className={styles.homeNotify} onClick={() => setShowBox(!showBox)}>
        <img className={styles.homeIconTopRight} src={BellIcon} />
        {renderNewNotificationsQuantity()}
      </div>
      <div
        className={
          showBox ? `${styles.homeNotifyBox} d-block` : styles.homeNotifyBox
        }
      >
        {renderNotifications()}
        <button className={styles.buttonSeeMore} onClick={handleClickSeeMore}>
          See More
        </button>
      </div>
      <img className={styles.homeIconTopRight} src={LogOutIcon} />
    </div>
  );
};

export default ShowBox;
