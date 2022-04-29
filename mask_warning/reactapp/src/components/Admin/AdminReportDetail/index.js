import React, { useState, useEffect, useContext } from "react";
import styles from "./ReportDetail.module.css";
import LeftControl from "../AdminLeftControl";
import Loading from "../../Helper/Loading";
import Modal from "../../Helper/Modal";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { CompleteIcon, reportImageDefault } from "../../../assets/ExportImages";
import { viewReportDetail, confirmSolvedReportAPI } from "../../../apis";
import { ModalStatusContext } from "../../../contexts/ModalStatusContext";
import { ImageModal } from "../../Helper";

const ReportDetailAdmin = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isSolved, setIsSolved] = useState();

  const modalStatusContext = useContext(ModalStatusContext);
  const { showModal, setShowModal } = modalStatusContext;

  const loadReportDetail = async () => {
    const data = await viewReportDetail({ reportId });

    setReport(data);
    setIsSolved(data.isSolved);
    setLoading(false);
  };

  const handleConfirmSolvedReport = async () => {
    const data = await confirmSolvedReportAPI({ reportId });

    if (data.status === "success") {
      setIsSolved(true);
      toast.success("Confirm Solved Report Success".toLocaleUpperCase());
    } else {
      toast.success("Confirm Solved Report Failed".toLocaleUpperCase());
    }
  };
  const renderButtonConfirmSolved = () => {
    if (!isSolved) {
      return (
        <button
          className={`mt-4 ${styles.detailComplete}`}
          onClick={() => setOpenModal(!openModal)}
        >
          <img src={CompleteIcon} /> Confirm Solved
        </button>
      );
    }
  };

  useEffect(() => {
    loadReportDetail();
  }, [report]);

  const handleShowImageModal = () => {
    setShowModal(true);
  };

  useEffect(async () => {
    await loadReportDetail();
  }, []);

  return (
    <section className={styles.homeMain}>
      {showModal && (
        <ImageModal
          showModal={showModal}
          setShowModal={setShowModal}
          imageUrl={report.image}
        />
      )}
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          Dialog="Question?"
          body="Are you sure this problem has been solved ?"
          action={handleConfirmSolvedReport}
        />
      )}
      <LeftControl toggle="reports" />
      {loading ? (
        <Loading />
      ) : (
        <div
          className={
            isSolved
              ? `${styles.detailRightContent} ${styles.active} col-10`
              : `${styles.detailRightContent} col-10`
          }
        >
          <div className={styles.detailTopInformation}>
            <h3 className={styles.detailId}>Report ID: {reportId}</h3>
            <p>{report.createdDate.split("T")[0]}</p>
          </div>
          <div className={styles.detailUserInformation}>
            <p>User ID:</p>
            <h4>{report.userId}</h4>
            <Link to={`/admin/users-manager/user-detail/${report.userId}`}>
              <button>Detail user</button>
            </Link>
          </div>
          <div className={`row ${styles.detailImageAndTitle}`}>
            <div className="col-12 d-flex">
              <img
                src={report.image === "" ? reportImageDefault : report.image}
                onClick={() => handleShowImageModal(report.image)}
              />
              <div className={styles.boxContent}>
                <h2 className={report.isSolved ? "d-block" : "d-none"}>
                  You had solve this report.
                </h2>
                <h5>{report.title}</h5>
              </div>
            </div>
            <div className={`col ${styles.detailReport}`}>
              <p>{report.description}</p>
            </div>
            {/* {solved()} */}
          </div>

          {renderButtonConfirmSolved()}
        </div>
      )}
    </section>
  );
}

export default ReportDetailAdmin;
