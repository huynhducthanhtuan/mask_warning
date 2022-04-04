import React, { useRef, useState } from "react";
import styles from "./Home.module.css"
import { Link } from "react-router-dom";


const HomeAdmin = () => {

    const [toggle, setToggle] = useState("home")

    return (
        <section className={styles.homeMain}>
            <div className={styles.homeLeftControl}>
                <img src="../icons/logo.png" />
                <h2>MANAGEMENTS</h2>

                <div className={styles.homeTabs}>
                    <div className={toggle === "home" ? `${styles.homeTabItem} ${styles.active}` : `${styles.homeTabItem}`}
                        onClick={() => setToggle("home")}>
                        <img src="./icons/home.png" />
                        <p>Home</p>
                    </div>

                    <div className={toggle === "users" ? `${styles.homeTabItem} ${styles.active}` : `${styles.homeTabItem}`}
                        onClick={() => setToggle("users")}>
                        <img src="./icons/users_manager.png" />
                        <p>Users Manager</p>
                    </div>

                    <div className={toggle === "reports" ? `${styles.homeTabItem} ${styles.active}` : `${styles.homeTabItem}`}
                        onClick={() => setToggle("reports")}>
                        <img src="./icons/reports_manager.png" />
                        <p>Reports Manager</p>
                    </div>
                </div>

                <div className={styles.homeDecs}>
                    <img src="./icons/line.png"/>
                    <h3>Mask Warning Admin Website</h3>
                    <p>Mask Warning Admin Website is a system help store notify customer wearing mask</p>
                </div>

            </div>

            <div className={styles.homeTabContents}>
                <div className={toggle === "home" ? `${styles.homeTabContent} ${styles.active}` : `${styles.homeTabContent}`}>

                </div>

                

            </div>
        </section>
    )
}
export default HomeAdmin;