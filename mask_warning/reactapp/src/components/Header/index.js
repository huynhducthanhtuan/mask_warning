import React from "react";
import styles from "./Header.module.css";
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <header className={`container ${styles.header}`}>
            <div className={styles.headerLogo}>
                <Link to="/"><img alt="" src="./icons/logo.png" /></Link>
            </div>
            <nav className={styles.headerNavigation}>
                <ul>
                    <li>
                        <Link to="/">
                            <img alt="" src="./icons/home.png" />
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/guide">
                            <img alt="" src="./icons/guide.png" />
                            <p>Guide</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/camera">
                            <img alt="" src="./icons/camera.png" />
                            <p>Camera</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="#!">
                            <img alt="" src="./icons/statistic.png" />
                            <p>Statistic</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/report">
                            <img alt="" src="./icons/report.png" />
                            <p>Report</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us">
                            <img src="./icons/aboutus.png" alt="" />
                            <p>About us</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.headerLogin}>
                <Link to="/signin">
                    <img src="./icons/signin.png" atl="" />
                    <p>Sign in</p>
                </Link>
            </div>
        </header>
    )
}

export default Header