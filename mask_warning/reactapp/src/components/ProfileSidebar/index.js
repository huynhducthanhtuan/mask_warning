import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfileSidebar.module.css'
const ProfileSidebar = () => {
    return (
        <section className={`col-3 ${styles.profileSidebar}`}>
            <h2>Profile</h2>
            <div className={styles.boxSide}>
                <img className={styles.avatarName} src='./icons/avatarProfile.png'></img>
                <div className={styles.formUploadImage}>
                    <button>Change avatar</button>
                </div>

                <p className={styles.myProfile}>My Profile</p>
                <ul>
                    <Link to="/">
                        <li>
                            <img src='./icons/iconProfilebar.png'></img>
                            <p>Personal information</p>
                        </li>
                    </Link>
                    <Link to="/">
                        <li>
                            <img src='./icons/iconProfilebar.png'></img>
                            <p>Password</p>
                        </li>
                    </Link>
                </ul>


            </div>
        </section>
    )
}

export default ProfileSidebar