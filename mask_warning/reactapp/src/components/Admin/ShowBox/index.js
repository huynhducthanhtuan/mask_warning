import React, { useState, useEffect } from "react";
import styles from "../AdminHome/Home.module.css";
import NotifyCard from "../AdminNotifyCard";
import { useNavigate } from "react-router-dom";
import { DEFAULT_NOTIFICATIONS_QUANTITY } from "../../../constants";
import { BellIcon, LogOutIcon } from "../../../assets/ExportImages";
import {
  viewNotificationAPI,
  countNewNotificationsQuantityAPI,
  signOutApi,
} from "../../../apis";

import { toast } from "react-toastify";
import Modal from "../../Helper/Modal";

const ShowBox = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const [showBox, setShowBox] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationsQuantity, setNewNotificationsQuantity] = useState();
  const [newNotificationIndexList, setNewNotificationIndexList] = useState();
  const navigatate = useNavigate();

  const getNotifications = async () => {
    const data = await viewNotificationAPI(DEFAULT_NOTIFICATIONS_QUANTITY);
    setNotifications(data.notifications);
  };

  const renderNotifications = () => {
    return notifications.map((notification, index) => (
      <NotifyCard
        key={index}
        notification={notification}
        isNewNotification={newNotificationIndexList.indexOf(index) !== -1}
      />
    ));
  };

  const getNewNotificationsQuantity = async () => {
    const data = await countNewNotificationsQuantityAPI();

    setNewNotificationsQuantity(data.quantity);
    setNewNotificationIndexList(data.newNotificationIndexList);
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

  const handleSignout = async () => {
    const data = await signOutApi();
    console.log(data);
    if (data.message === "Sign out success !!") {
      toast.success(data.message.toLocaleUpperCase());
      navigate("/admin/signin");
      localStorage.removeItem("isAdminLoggedIn");
    }
  };

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
      <img
        className={styles.homeIconTopRight}
        src={LogOutIcon}
        onClick={handleSignout}
        alt=""
      />
    </div>
  );
};

export default ShowBox;
