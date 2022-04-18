import styles from "./NotifyCard.module.css"

const NotifyCard = ({ report, user }) => {
    return (
        <div className={styles.cardMain}>
            <img className="d-line" src="./icons/line.png" />
            <div className={styles.cardBox}>
                <img src={user.avatar} />
                <div className={styles.cardContent}>
                    <p>{user.name}</p>
                    <p>{report.description}</p>
                    <p>1 hour(s) ago</p>
                </div>
            </div>
        </div>
    )
}
export default NotifyCard;