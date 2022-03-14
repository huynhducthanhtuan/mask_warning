import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={`container ${styles.header}`}>
      <div className={styles.headerLogo}>
        <Link to="/">
          <img alt="" src="./icons/logo.png" />
        </Link>
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
            <a>
              <img alt="" src="./icons/guide.png" />
              <p>Guide</p>
            </a>
          </li>
          <li>
            <a>
              <img alt="" src="./icons/camera.png" />
              <p>Camera</p>
            </a>
          </li>
          <li>
            <a>
              <img alt="" src="./icons/statistic.png" />
              <p>Statistic</p>
            </a>
          </li>
          <li>
            <a>
              <img alt="" src="./icons/report.png" />
              <p>Report</p>
            </a>
          </li>
          <li>
            <Link to="/about-us">
              <img src="./icons/about us.png" alt="" />
              <p>About us</p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.headerLogin}>
        <Link to="/signin">
          <img src="./icons/sign in.png" atl="" />
          <p>Sign in</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
//
