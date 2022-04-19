import styles from "./NotifyCard.module.css";
import { Link } from "react-router-dom";

const NotifyCard = ({ notification }) => {
  return (
    <div className={styles.cardMain}>
      <Link
        to={`/admin/reports-manager/report-detail/${notification.reportId}`}
        className={styles.cardBox}
      >
        <img src={notification.userImage} />
        <div className={styles.cardContent}>
          <p>{notification.userFullname}</p>
          <p>{notification.reportDesc}</p>
          <p>1 hour(s) ago</p>
        </div>
      </Link>
    </div>
  );
};

export default NotifyCard;
