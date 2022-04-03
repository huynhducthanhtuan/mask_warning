import React from "react";
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={` container ${styles.main}`}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className={styles.footerHeading}>
                            <h2 > Our Contact Details</h2>
                            <h4 >Let’s connect.</h4>
                       </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={styles.footerContact}>
                            <h4 className={styles.footerContactHeading} >Telephone</h4>
                            <span className={styles.footerContactInfo}>(+84) 967933259</span>
                        </div>
                        <div className={styles.footerContact}>
                            <h4 className={styles.footerContactHeading} >WhatsApp</h4>
                            <span className={styles.footerContactInfo}>+971 555 0114 321</span>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={styles.footerContact}>
                            <h4 className={styles.footerContactHeading} >Office</h4>
                            <span className={styles.footerContactInfo}>455 Hoàng Diệu, Bình Thuận, Hải Châu, Đà Nẵng 550000</span>
                        </div>
                        <div className={styles.footerContact}>
                            <h4 className={styles.footerContactHeading} >Email</h4>
                            <span className={styles.footerContactInfo}>dorephan@mmroup.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
