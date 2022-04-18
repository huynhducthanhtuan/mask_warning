import React from "react";
import SideBarLeftStatistic from "../SideBarLeftStatistic";
import BoxBoard from "../BoxStatistic";
import styles from "./Statistic.module.css";
import { Link } from "react-router-dom";
import Header from "../Header";

const Statistic = () => {
  return (
    <body>
      <section>
        <Header />
        <SideBarLeftStatistic />
        <div className={`col-7 ${styles.board}`}>
          <div className={`d-flex d-flex justify-content-around align-middle `}>
            <BoxBoard />
            <BoxBoard />
            <BoxBoard />
            <BoxBoard />
          </div>
        </div>
      </section>
    </body>
  );
};
export default Statistic;
