import React from "react"
import styles from "./Report.module.css"
import Header from "../Header"
import { Link } from "react-router-dom"
const Camera = () => {

    return (
        <section className={`container_fluid ${styles.camera}`}>
            <Header />
            <div className={`row ${styles.camera__header}`}>
                <div className={`col-3 ${styles.sideBar}`}>
                    <Link to="/">
                        <div className={`d-flex ${styles.sideBar__home}`}>
                            <img src="./icons/home.png"></img>
                            <p>Report</p>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className={`d-flex ${styles.sideBar__home}`}>
                            <img src="./icons/report__history.png"></img>
                            <p>Report history</p>
                        </div>
                    </Link>

                </div>
                <div className="col-9">
                    <div className={`col-4 ${styles.chooseImage}`}>
                        <h5>Choose image</h5>
                        <img src="./img/imageDefault.jpg"></img>
                        <input type="file" />
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                </div>
            </div>
        </section>
    )
}

export default Camera

