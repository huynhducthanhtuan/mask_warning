import styles from "./NotifyCard.module.css";
import { Link } from "react-router-dom";

const NotifyCard = ({ notification }) => {
  const { reportId, userImage, userFullname, reportDesc } = notification;

  return (
    <div className={styles.cardMain}>
      <Link
        to={`/admin/reports-manager/report-detail/${reportId}`}
        className={styles.cardBox}
      >
        <img src={userImage} />
        <div className={styles.cardContent}>
          <p>{userFullname}</p>
          <p>{reportDesc}</p>
          <p>1 hour(s) ago</p>
        </div>
      </Link>
    </div>
  );
};

export default NotifyCard;
