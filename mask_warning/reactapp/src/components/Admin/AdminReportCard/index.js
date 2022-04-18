import styles from "./ReportCard.module.css"

const ReportCard = ({report}) => {
    return(
        <div className={report.isSolved ? `${styles.cardMain} ${styles.solved}`: styles.cardMain}>
            <p>#{report.id}</p>
            <p>{report.createdDate}</p>
            <p>Click for more detail</p>
            <button>Detail user</button>
        </div>
    )
}
export default ReportCard;