import { Link, useNavigate } from "react-router-dom";
import styles from "./ReportCard.module.css";

const ReportCard = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div>
      {reports.map((report, index) => {
        return (
          <Link
            to={`/admin/reports-manager/report-detail/${report.reportId}`}
            key={report.reportId}
          >
            <div
              className={
                report.isSolved
                  ? `${styles.cardMain} ${styles.solved}`
                  : styles.cardMain
              }
            >
              <p>#{index}</p>
              <p>{report.createdDate.split("T")[0]}</p>
              <p>{report.title}</p>
              <Link to={`/admin/reports-manager/user-detail/${report.userId}`}>
                <button
                  className={styles.cardButton}
                  onClick={() =>
                    navigate(
                      `/admin/reports-manager/user-detail/${report.userId}`
                    )
                  }
                >
                  Detail user
                </button>
              </Link>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ReportCard;
