import React from "react";
import styles from "./BoxStatistic.module.css";

const BoxBoard = () => {
  return (
    <div className={styles.boxBoard}>
      <h4>11,760</h4>
      <div className="d-flex">
        <p>Total Guest</p>
        <p className={styles.progress}>+210</p>
      </div>
    </div>
  );
};

export default BoxBoard;
