import React, { useEffect } from "react";
import styles from "./Report.module.css";
import Header from "../Header";
import { Link } from "react-router-dom";

const Report = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      <div className={`row ${styles.camera__header}`}>
        <div className={`col-3 ${styles.sideBar}`}>
          <Link to="/report">
            <div className={`d-flex ${styles.sideBar__home}`}>
              <img src="./icons/home.png"></img>
              <p>Report</p>
            </div>
          </Link>
          <Link to="/report-history">
            <div className={`d-flex ${styles.sideBar__home}`}>
              <img src="./icons/report__history.png"></img>
              <p>Report history</p>
            </div>
          </Link>
        </div>
        <div className={`col-9 ${styles.reportRight}`}>
          <div className={`col-4 ${styles.chooseImage}`}>
            <h5>Choose image</h5>
            <img src="./img/imageDefault.jpg"></img>
            <p className={styles.textInstruction}>
              Click "Choose File" button to upload an image:
            </p>
            <input type="file" />
          </div>
          <div className={`col-4 ${styles.chooseImage}`}>
            <h5>Choose bugs</h5>
            <div className={styles.selectionBug}>
              <p>Camera error</p>
              <select>
                <option value=""> -- Please select --</option>
                <option value="A">Apple</option>
                <option value="B">Banana</option>
                <option value="C">Cranberry</option>
              </select>
            </div>
            <div className={styles.selectionBug}>
              <p>Speaker error</p>
              <select>
                <option value=""> -- Please select --</option>
                <option value="A">Apple</option>
                <option value="B">Banana</option>
                <option value="C">Cranberry</option>
              </select>
            </div>
          </div>
          <div className={`col-4 ${styles.reportDescription}`}>
            <h5>Description</h5>
            <input type="text" placeholder="Report description"></input>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
