import React, {useContext, useState} from 'react'
import styles from "./Header.module.css";
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { isAuthenticated } from "../Auth";
import homeIcon from '../../assets/icons/home.png'
import signOut from '../../assets/icons/signout.png'
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../App'
import Modal from '../Modal';
import { AboutUsIcon, HomeIcon, GuideIcon, CameraIcon, StatisticIcon, ReportIcon, LogoImage, SigninIcon } from "../ExportImages";
const Header = () => {
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const notify = () => {
        if(!state) {
            toast.info("YOU MUST SIGN IN !")
        }
    };

    const signOutACtion = () => {
        localStorage.removeItem("jwt");
        dispatch({type:"CLEAR"})
        navigate('/signin')
    }

    const render = () => {
        if(isAuthenticated()) {
            return(
                <div className={styles.headerLogin}  onClick={() => setModalOpen(true)}>                 
                    <img src={signOut} atl="" />
                    <p>Sign Out</p>
                </div>
            )
        }
        else 
            return(
                <div className={styles.headerLogin} onClick={() => navigate('/signin')}>
                    <img src={SigninIcon} atl="" />
                    <p>Sign In</p>
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
                        <Link to={state? '/guide':'/signin'} onClick={notify}>
                            <img alt="" src={GuideIcon} />
                            <p>Guide</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={state? '/camera':'/signin'} onClick={notify}>
                            <img alt="" src={CameraIcon} />
                            <p>Camera</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={state? '/#!':'/signin'} onClick={notify}>
                            <img alt="" src={StatisticIcon} />
                            <p>Statistic</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={state? '/report':'/signin'} onClick={notify}>
                            <img alt="" src={ReportIcon} />
                            <p>Report</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us">
                            <img src={AboutUsIcon} alt="" />
                            <p>About us</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            {render()}
            {modalOpen && <Modal body="Are you sure you want to sign out?" setOpenModal={setModalOpen} action={signOutACtion}  />}
        </header>
    )
}

export default Header