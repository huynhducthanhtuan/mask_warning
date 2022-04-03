import React from "react";
import styles from "./Header.module.css";
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { isAuthenticated } from "../Auth";
import homeIcon from '../../assets/icons/home.png'
import signOut from '../../assets/icons/signout.png'
import { ToastContainer, toast } from 'react-toastify';
const Header = () => {

    const navigate = useNavigate()

    const signOutACtion = () => {
        localStorage.removeItem("jwt");
        navigate('/signin')
        toast.success('Sign Out Success')
    }

    const render = () => {
        if(isAuthenticated()) {
            return(
                <div className={styles.headerLogin}>
                    <Link to="/signin" onClick={signOutACtion}>
                        <img src={signOut} atl="" />
                        <p>Sign Out</p>
                    </Link>
                </div>
            )
        }
        else 
            return(
                <div className={styles.headerLogin}>
                    <Link to="/signin">
                        <img src="./icons/signin.png" atl="" />
                        <p>Sign In</p>
                    </Link>
                </div>
            )
    }
    return (
        <header className={`container ${styles.header}`}>
            <div className={styles.headerLogo}>
                <Link to="/"><img alt="" src="./icons/logo.png" /></Link>
            </div>
            <nav className={styles.headerNavigation}>
                <ul>
                    <li>
                        <Link to="/">
                            <img alt="" src={homeIcon} />
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
            {render()}
        </header>
    )
}

export default Header