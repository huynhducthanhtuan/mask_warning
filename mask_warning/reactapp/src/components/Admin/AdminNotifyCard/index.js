import styles from "./NotifyCard.module.css";
import { Link } from "react-router-dom";

const NotifyCard = ({ notification }) => {
  const {
    reportId,
    userImage,
    userFullname,
    reportDesc,
    createdDate,
    timestampDifferent,
  } = notification;

  const handleRenderTimestampDifferent = () => {
    return timestampDifferent == 0
      ? `today`
      : `${timestampDifferent} day(s) ago`;
  };

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
          <p>{handleRenderTimestampDifferent()}</p>
        </div>
      </Link>
    </div>
  );
};

export default NotifyCard;
