import styles from "./NotifyCard.module.css";
import { Link } from "react-router-dom";

const NotifyCard = ({ notification, isNewNotification }) => {
  const { reportId, userImage, userFullName, description, timestampDifferent } =
    notification;

  const handleRenderTimestampDifferent = () => {
    return timestampDifferent == 0
      ? `today`
      : `${timestampDifferent} day(s) ago`;
  };

  return (
    <div
      className={`${styles.cardMain} ${
        isNewNotification ? styles.newNotification : ""
      }`}
    >
      <Link
        to={`/admin/reports-manager/report-detail/${reportId}`}
        className={styles.cardBox}
      >
        <img src={userImage} />
        <div className={styles.cardContent}>
          <p>{userFullName}</p>
          <p>{description}</p>
          <p>{handleRenderTimestampDifferent()}</p>
        </div>
      </Link>
    </div>
  );
};

export default NotifyCard;
