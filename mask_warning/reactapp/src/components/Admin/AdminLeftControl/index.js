import React, { useRef, useState } from "react";
import styles from "./LeftControl.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  VerticalLogo,
  HomeIcon,
  useManager,
  reportManager,
  Line,
} from "../../../assets/ExportImages";

const LeftControl = ({ toggle = "home" }) => {
  const navigate = useNavigate();

  return (
    <div className="col-2">
      <img src={VerticalLogo} />
      <h2 className={styles.reportTitle}>MANAGEMENTS</h2>
      <div className={styles.homeTabs}>
        <div
          className={
            toggle === "home"
              ? `${styles.homeTabItem} ${styles.active}`
              : `${styles.homeTabItem}`
          }
          onClick={() => navigate("/admin/home")}
        >
          <img src={HomeIcon} />
          <p>Home</p>
        </div>

        <div
          className={
            toggle === "users"
              ? `${styles.homeTabItem} ${styles.active}`
              : `${styles.homeTabItem}`
          }
          onClick={() => navigate("/admin/users-manager")}
        >
          <img src={useManager} />
          <p>Users Manager</p>
        </div>

        <div
          className={
            toggle === "reports"
              ? `${styles.homeTabItem} ${styles.active}`
              : `${styles.homeTabItem}`
          }
          onClick={() => navigate("/admin/reports-manager")}
        >
          <img src={reportManager} />
          <p>Reports Manager</p>
        </div>
      </div>

      <div className={styles.homeDecs}>
        <img src={Line} />
        <h3 className={styles.titleHome}>Mask Warning. 2022</h3>
        <p className={styles.desHome}>
          Mask Warning is a system help store notify customer wearing mask
        </p>
      </div>
    </div>
  );
};

export default LeftControl;