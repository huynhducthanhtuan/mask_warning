import React, { useRef, useState } from "react";
import styles from "./ReportsManager.module.css"
import { Link } from "react-router-dom";

const ReportsManagerAdmin = () => {

    const [toggle, setToggle] = useState("home")

    return (
        <section className={styles.homeMain}>
            <div>Reports</div>
        </section>
    )
}
export default ReportsManagerAdmin;