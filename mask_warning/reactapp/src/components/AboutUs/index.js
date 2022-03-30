import React from "react"
import styles from "./AboutUs.module.css"
import Header from "../Header"
import Footer from "../Footer"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const AboutUs = () =>{
    var settings = {
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
    return (
        <>
            <Header />
            <div className={`container ${styles.aboutUs}`}>
                <div className="container">
                    <h2 className={styles.heading}>About Us</h2>
                    <div className={`${styles.myTeam}`}>
                        <h4 className={styles.headingMyTeam}>We’re here to guarantee your success</h4>
                        <div className={styles.descMyTeam}>
                            <span >ConsultUs provides consulting services that help business owners and leaders build a more valuable business. We worked with their founder to build a professional, modern site that follows the StoryBrand framework to clearly communicates the value it adds to potential clients</span>
                        </div>
                    </div>
                    <div className={styles.ourTeam}>
                        <h3 className={styles.headingOurTeam}>Our Team</h3>
                    </div>

                   <Slider {...settings} >
                        
                        <div className={styles.sliderMember} >
                            <img className={styles.avatar} src="./img/TeamMember.png" alt="" />
                            <h4 className={styles.nameAvatar}>Huỳnh Ngọc Hiếu</h4>

                        </div>
                                                    
                        <div className={styles.sliderMember}>
                            <img className={styles.avatar} src="./img/TeamMember-1.png" alt="" />
                            <h4 className={styles.nameAvatar}>Huỳnh Đức Thanh Tuấn</h4>

                        </div>
                                                    
                        <div className={styles.sliderMember}>
                            <img className={styles.avatar} src="./img/TeamMember-2.png" alt="" />
                            <h4 className={styles.nameAvatar}>Võ Trung Hiếu</h4>

                        </div>
                                                    
                        <div className={styles.sliderMember}>
                            <img className={styles.avatar} src="./img/TeamMember-3.png" alt="" />
                            <h4 className={styles.nameAvatar}>Nguyễn Hồng Lịch</h4>
                        </div>
                        <div className={styles.sliderMember}>
                            <img className={styles.avatar} src="./img/TeamMember-4.png" alt="" />
                            <h4 className={styles.nameAvatar}>Lê Văn Thuần</h4>
                        </div>
                    </Slider>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs

