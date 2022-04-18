import React, { useEffect, useState } from "react";
import styles from "./ReportsManager.module.css";
import { Link } from "react-router-dom";

const ReportsManagerAdmin = () => {
  const [toggle, setToggle] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles.homeMain}>
      <div>Reports</div>
    </section>
  );
};

export default ReportsManagerAdmin;
