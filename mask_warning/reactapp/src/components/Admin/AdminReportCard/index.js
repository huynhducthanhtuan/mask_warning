import { Link } from "react-router-dom";
import styles from "./ReportCard.module.css"

const ReportCard = ({ reports }) => {
    return (
        <div>
            {reports.map((report) => {
                return (
                    <Link to={`/admin/reports-manager/report-detail/${report.id}`}>
                        <div className={report.isSolved ? `${styles.cardMain} ${styles.solved}` : styles.cardMain}>
                            <p>#{report.id}</p>
                            <p>{report.createdDate}</p>
                            <p>Click for more detail</p>
                            <button>Detail user</button>
                        </div>
                    </Link>
                )
            })}
        </div>

    )
}
export default ReportCard;