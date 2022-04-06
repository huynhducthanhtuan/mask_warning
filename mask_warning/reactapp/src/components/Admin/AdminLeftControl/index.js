import React, { useRef, useState } from "react";
import styles from "./LeftControl.module.css"
import { Link, useNavigate } from "react-router-dom";
import { VerticalLogo } from "../../ExportImages";

const LeftControl = ({toggle = "home"}) => {

    const navigate = useNavigate()

    return (
            <div className={styles.homeLeftControl}>
                <img src={VerticalLogo} />
                <h2>MANAGEMENTS</h2>

                <div className={styles.homeTabs}>
                    <div className={toggle === "home" ? `${styles.homeTabItem} ${styles.active}` : `${styles.homeTabItem}`}
                        onClick={() => navigate("/homeAdmin")}>
                        <img src="./icons/home.png" />
                        <p>Home</p>
                    </div>

                    <div className={toggle === "users" ? `${styles.homeTabItem} ${styles.active}` : `${styles.homeTabItem}`}
                        onClick={() => navigate("/usersManager")}>
                        <img src="./icons/users_manager.png" />
                        <p>Users Manager</p>
                    </div>

                    <div className={toggle === "reports" ? `${styles.homeTabItem} ${styles.active}` : `${styles.homeTabItem}`}
                        onClick={() => navigate("/reportsManager")}>
                        <img src="./icons/reports_manager.png" />
                        <p>Reports Manager</p>
                    </div>
                </div>

                <div className={styles.homeDecs}>
                    <img src="./icons/line.png" />
                    <h3>Mask Warning Admin Website</h3>
                    <p>Mask Warning Admin Website is a system help store notify customer wearing mask</p>
                </div>

            </div>

    )
}
export default LeftControl;