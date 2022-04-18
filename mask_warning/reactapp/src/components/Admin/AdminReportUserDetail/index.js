import React, { useRef, useState } from "react";
import styles from "./ReportUserDetail.module.css"
import LeftControl from "../AdminLeftControl";
import { BackButton, ReportUserImage } from "../../../assets/ExportImages";
import { useParams } from "react-router-dom";


const ReportUserDetailAdmin = () => {

    const { userId } = useParams()
    console.log(userId);

    const exampleUser = {
        userId: userId,
        avatar: ReportUserImage,
        name: "Huynh Ngoc Hieu",
        birth: "21/02/1995",
        email: "tgthien212@gmail.com",
        address: "297 Phạm Ngũ Lão",
        district: "Hải Châu",
        city: "Đà Nẵng",
        country: "Việt Nam",
        tel: "0376543210"
    };

    return (
        <section className="d-flex">
            <LeftControl toggle="reports" />
            <div className={styles.rightContent}>
                <div className={styles.backButton} onClick={()=>window.history.back()}>
                    <img src={BackButton} />
                    <p>Back</p>
                </div>
                <div className="d-flex">
                    <img className={styles.avatar} src={ReportUserImage} />
                    <div className={styles.idAndName}>
                        <p>User ID: #{userId}</p>
                        <p>{exampleUser.name}</p>
                    </div>
                </div>
                <div>
                    <div className={styles.shortInformation}>
                        <p>Day of birth:</p>
                        <p>{exampleUser.birth}</p>
                    </div>
                    <div className={styles.shortInformation}>
                        <p>Email:</p>
                        <p>{exampleUser.email}</p>
                    </div>
                    <h3 className={styles.contactInformation}>Contact Information</h3>
                    <div>
                        <div className={styles.shortInformation}>
                            <p>Address:</p>
                            <p>{exampleUser.address}</p>
                        </div>
                        <div className={styles.shortInformation}>
                            <p>District:</p>
                            <p>{exampleUser.district}</p>
                        </div>
                        <div className={styles.shortInformation}>
                            <p>Province/City:</p>
                            <p>{exampleUser.city}</p>
                        </div>
                        <div className={styles.shortInformation}>
                            <p>Country:</p>
                            <p>{exampleUser.country}</p>
                        </div>
                        <div className={styles.shortInformation}>
                            <p>Tel:</p>
                            <p>{exampleUser.tel}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ReportUserDetailAdmin