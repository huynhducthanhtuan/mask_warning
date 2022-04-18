import React, { useRef, useState, useEffect } from "react";
import styles from "./ReportUserDetail.module.css";
import LeftControl from "../AdminLeftControl";
import { BackButton, ReportUserImage } from "../../../assets/ExportImages";
import { useParams } from "react-router-dom";
import { viewDetailUser } from "../../../apis";
import Loading from "../../Helper/Loading";

const ReportUserDetailAdmin = () => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();
  const loadReportDetailUser = async () => {
    await viewDetailUser({ userId }).then((data) => {
      setUserInfo(data);
      setLoading(false);
    });
  };
  console.log("user detail ", userInfo);
  useEffect(() => {
    loadReportDetailUser();
  }, []);
  return (
    <section className="d-flex">
      <LeftControl toggle="reports" />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.rightContent}>
          <div
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            <img src={BackButton} />
            <p>Back</p>
          </div>
          <div className="d-flex">
            <img className={styles.avatar} src={ReportUserImage} />
            <div className={styles.idAndName}>
              <p>User ID: #{userId}</p>
              <p>{userInfo.name}</p>
            </div>
          </div>
          <div>
            <div className={styles.shortInformation}>
              <p>Gender:</p>
              <p>{userInfo.gender}</p>
            </div>
            <div className={styles.shortInformation}>
              <p>Email:</p>
              <p>{userInfo.email}</p>
            </div>
            <h3 className={styles.contactInformation}>Contact Information</h3>
            <div>
              <div className={styles.shortInformation}>
                <p>Address:</p>
                <p>{userInfo.address}</p>
              </div>
              <div className={styles.shortInformation}>
                <p>District:</p>
                <p>{userInfo.district}</p>
              </div>
              <div className={styles.shortInformation}>
                <p>Store Name:</p>
                <p>{userInfo.storeName}</p>
              </div>
              <div className={styles.shortInformation}>
                <p>Country:</p>
                <p>{userInfo.hometown}</p>
              </div>
              <div className={styles.shortInformation}>
                <p>Tel:</p>
                <p>{userInfo.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default ReportUserDetailAdmin;
