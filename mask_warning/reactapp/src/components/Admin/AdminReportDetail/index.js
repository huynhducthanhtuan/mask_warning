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
  }, []);

  const handleShowImageModal = () => {
    setShowModal(true);
  };

  useEffect(async () => {
    await loadReportDetail();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <LeftControl />
        <div className="col-10">

        </div>
      </div>
    </div>
  );
}

export default ReportDetailAdmin;
