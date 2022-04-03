import React, { useContext, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../Auth";
import { UserContext } from "../../App";
import Modal from "../Modal";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const notify = () => {
    if (!state) {
      toast.info("PLEASE SIGNIN FIRST !!");
    }
  };

  const signOutACtion = () => {
    localStorage.removeItem("jwt");
    dispatch({ type: "CLEAR" });
    toast.success("Sign Out Success");
    navigate("/signin");
  };

  const render = () => {
    if (isAuthenticated()) {
      return (
        <div className={styles.headerLogin} onClick={() => setModalOpen(true)}>
          <img src="./icons/signout.png" atl="" />
          <p>Sign Out</p>
        </div>
      );
    } else
      return (
        <div className={styles.headerLogin} onClick={() => navigate("/signin")}>
          <img src="./icons/signin.png" atl="" />
          <p>Sign In</p>
        </div>
      );
  };
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
              <img src="./icons/home.png" alt="" />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to={state ? "/guide" : "/signin"} onClick={!state && notify}>
              <img alt="" src="./icons/guide.png" />
              <p>Guide</p>
            </Link>
          </li>
          <li>
            <Link to={state ? "/camera" : "/signin"} onClick={!state && notify}>
              <img alt="" src="./icons/camera.png" />
              <p>Camera</p>
            </Link>
          </li>
          <li>
            <Link
              to={state ? "/statistic" : "/signin"}
              onClick={!state && notify}
            >
              <img alt="" src="./icons/statistic.png" />
              <p>Statistic</p>
            </Link>
          </li>
          <li>
            <Link to={state ? "/report" : "/signin"} onClick={!state && notify}>
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
      {render()}
      {modalOpen && (
        <Modal
          body="Are you sure to sign out ??"
          setOpenModal={setModalOpen}
          action={signOutACtion}
        />
      )}
    </header>
  );
};

export default Header;
