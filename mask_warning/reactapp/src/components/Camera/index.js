import React from "react"
import styles from "./Camera.module.css"
import Header from "../Header"

const Camera = () => {
    return (
        <section className={`container_fluid ${styles.camera}`}>
            <Header />
            <div className={styles.activeCamera}>
                <img className={styles.activeCamraImage} src={'/video_feed/'} alt="logo" />
                <div className={styles.speaker}>
                    <img src="./icons/speaker.png"></img>
                    <p>Notification</p>
                </div>
            </div>
        </section>
    )
}

export default Camera

