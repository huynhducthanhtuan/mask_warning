import React from "react";
import styles from "./SideBarLeftStatistic.module.css";
import { Link } from "react-router-dom";

const SideBarLeftStatistic = () => {
  return (
    <section>
      <div className={`col-3 ${styles.sideBar}`}>
        <h1>Statistic</h1>
        <Link to="/statistic">
          <div className={`d-flex ${styles.sideBar__statistic}`}>
            <img src="./icons/home.png"></img>
            <p> 1. Guest Statistic</p>
          </div>
        </Link>
        <Link to="#!">
          <div className={`d-flex ${styles.sideBar__statistic}`}>
            <img src="./icons/report__history.png"></img>
            <p>2. Unwearing Mask Guest Statistic</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SideBarLeftStatistic;
