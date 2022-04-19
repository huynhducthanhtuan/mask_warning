import styles from "./NotifyCard.module.css";

const NotifyCard = ({ notification }) => {
  return (
    <div className={styles.cardMain}>
      <div className={styles.cardBox}>
        <img src={notification.userImage} />
        <div className={styles.cardContent}>
          <p>{notification.userFullname}</p>
          <p>{notification.reportDesc}</p>
          <p>1 hour(s) ago</p>
        </div>
      </div>
    </div>
  );
};

export default NotifyCard;
