import styles from "./NotifyCard.module.css";

const NotifyCard = ({ notifys }) => {
  return (
    <>
      {notifys.map((notify) => {
        return (
          <div className={styles.cardMain} key={notify.reportId}>
            <img className="d-line" src="./icons/line.png" />
            <div className={styles.cardBox}>
              <img src={notify.userImage} />
              <div className={styles.cardContent}>
                <p>{notify.userFullname}</p>
                <p>{notify.reportDesc}</p>
                <p>1 hour(s) ago</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default NotifyCard;
