import React, { useRef, useState, useEffect } from "react";
import styles from "./ReportDetail.module.css";
import { Link, useParams } from "react-router-dom";
import LeftControl from "../AdminLeftControl";
import { CompleteIcon } from "../../../assets/ExportImages";
import { viewReportDetail } from "../../../apis";
import Loading from "../../Helper/Loading";
import Modal from "../../Helper/Modal";

const ReportDetailAdmin = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const loadReportDetail = async () => {
    await viewReportDetail({ reportId }).then((data) => {
      setReport(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadReportDetail();
  }, []);

  const solved = () => {
    if (!report.isSolved)
      return (
        <button
          className={`mt-4 ${styles.detailComplete}`}
          onClick={() => setOpenModal(!openModal)}
        >
          <img src={CompleteIcon} /> Complete
        </button>
      );
  };

  return (
    <section className={styles.homeMain}>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          Dialog="Question?"
          body="Are you sure this problem has been solved?
          (You can’t not change back)"
        />
      )}
      <LeftControl toggle="reports" />
      {loading ? (
        <Loading />
      ) : (
        <div
          className={
            report.isSolved
              ? `${styles.detailRightContent} ${styles.active}`
              : styles.detailRightContent
          }
        >
          <div className={styles.detailTopInformation}>
            <h3 className={styles.detailId}>ID#{reportId}</h3>
            <p>{report.createdDate.split("T")[0]}</p>
          </div>
          <div className={styles.detailUserInformation}>
            <p>User ID:</p>
            <h4>{report.userId}</h4>
            <Link to={`/admin/reports-manager/user-detail/${report.userId}`}>
              <button>Detail user</button>
            </Link>
          </div>
          <div className={styles.detailImageAndTitle}>
            <img src={report.image} />
            <div>
              <h2 className={report.isSolved ? "d-block" : "d-none"}>
                You have done this task
              </h2>
              <h5>{report.title}</h5>
            </div>
          </div>
          <div className={styles.detailReport}>
            <p>{report.description}</p>
          </div>
          {solved()}
        </div>
      )}
    </section>
  );
};

export default ReportDetailAdmin;
