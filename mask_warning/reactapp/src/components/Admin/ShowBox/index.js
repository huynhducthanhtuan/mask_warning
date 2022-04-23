import React, { useState, useEffect } from "react";
import styles from "../AdminHome/Home.module.css";
import NotifyCard from "../AdminNotifyCard";
import { DEFAULT_NOTIFICATIONS_QUANTITY } from "../../../constants";
import { BellIcon, LogOutIcon } from "../../../assets/ExportImages";
import {
  viewNotificationAPI,
  countNewNotificationsQuantityAPI,
  signOutApi,
} from "../../../apis";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../../Helper/Modal";

const ShowBox = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const [showBox, setShowBox] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationsQuantity, setNewNotificationsQuantity] = useState();
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

  const renderButtonSeeMoreOrSeeLess = () => {
    return notificationsStatus == "shortlisted" ? (
      <button className={styles.buttonSeeMore} onClick={handleClickSeeMore}>
        See More
      </button>
    ) : (
      <button className={styles.buttonSeeLess} onClick={handleClickSeeLess}>
        See Less
      </button>
    );
  };

  const handleClickSeeMore = () => {
    setNotificationsStatus("full");
  };

  const handleClickSeeLess = () => {
    setNotificationsStatus("shortlisted");
  };
  // useEffect(() => {
  //   loadNotifications();
  // }, []);

  useEffect(async () => {
    await getNotifications(notificationsStatus);
  }, [notificationsStatus]);

  useEffect(async () => {
    await getNewNotificationsQuantity();
  }, [newNotificationsQuantity]);

  const handleSignout = async () => {
    const data = await signOutApi();
    console.log(data);
    if (data.message === "Sign out success !!") {
      toast.success(data.message.toLocaleUpperCase());
      navigate("/admin/signin");
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          body="Are you sure to sign out ??"
          setOpenModal={setModalOpen}
          action={handleSignout}
          // isCss={true}
        />
      )}
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
          {renderButtonSeeMoreOrSeeLess()}
        </div>
        <div onClick={() => setModalOpen(true)}>
          <img className={styles.homeIconTopRight} src={LogOutIcon} alt="" />
        </div>
      </div>
    </>
  );
};

export default ShowBox;
