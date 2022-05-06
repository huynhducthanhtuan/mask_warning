import React, { useEffect } from "react";
import styles from "./Home.module.css";
import Header from "../Header";
import Footer from "../Footer";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "./../Auth/index";
import { Slider2 } from "../../assets/ExportImages";
import { Slider3 } from "../../assets/ExportImages";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderDot.css";

const Home = () => {
  const { token } = isAuthenticated();

  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const notify = () => {
    if (!token) {
      toast.info("YOU MUST SIGN IN !");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <body>
      <section className={`container_fluid ${styles.home}`}>
        <Header />
        <Slider {...settings}>
          <div className={styles.homeSlider}>
            <img className={styles.sliderImage} src="./icons/slider.png"></img>
            <Link to={token ? "/camera" : "/signin"}>
              <div className={`${styles.homeSliderGettingStarted}`}>
                <p>Getting Started</p>
              </div>
            </Link>
            <Link to={token ? "/camera" : "/signin"}>
              <div className={styles.homeSliderArrowBot}>
                <img src="./icons/arrowBottom.png"></img>
              </div>
            </Link>
          </div>
          <div className={styles.homeSlider}>
            <img className={styles.sliderImage} src={Slider2}></img>
            <Link to={token ? "/camera" : "/signin"}>
              <div className={styles.homeSliderGettingStarted}>
                <p>Getting Started</p>
              </div>
            </Link>
            <Link to={token ? "/camera" : "/signin"}>
              <div className={styles.homeSliderArrowBot}>
                <img src="./icons/arrowBottom.png"></img>
              </div>
            </Link>
          </div>
          <div className={styles.homeSlider}>
            <img className={styles.sliderImage} src={Slider3}></img>
            <Link to={token ? "/camera" : "/signin"}>
              <div className={styles.homeSliderGettingStarted}>
                <p>Getting Started</p>
              </div>
            </Link>
            <Link to={token ? "/camera" : "/signin"}>
              <div className={styles.homeSliderArrowBot}>
                <img src="./icons/arrowBottom.png"></img>
              </div>
            </Link>
          </div>
        </Slider>
      </section>
      <section className={`container ${styles.homeOurService}`}>
        <div className={` ${styles.homeText}`}>
          <div>
            <h2>Our Services</h2>
            <img src="./icons/line.png"></img>
          </div>
          <span>
            We provide to you the best choices for you to follow the status of
            your customer. It can check whether the customer wearing mask or not
          </span>
        </div>
        <div className={styles.homeOurServiceListItems}>
          <div className={`${styles.homeOurServiceItem}`}>
            <img src="./icons/tracking.png"></img>
            <h3>Tracking through camera </h3>
            <p>Track customer information entering and leaving the store </p>
          </div>
          <div className={styles.homeOurServiceItem}>
            <img src="./icons/care.png"></img>
            <h3>Emergency care </h3>
            <p>
              You can get 24/7 urgent care for your healt of your customer and
              your-self.{" "}
            </p>
          </div>
        </div>
      </section>
      <section className={`container ${styles.homeGuide}`}>
        <div className={styles.homeText}>
          <div>
            <h2>Guide</h2>
            <img src="./icons/line.png"></img>
          </div>
          <span>
            We have some basic steps to use this website. You can click view
            more to see more details{" "}
          </span>
        </div>
        <div className={styles.homeGuideImage}>
          <img src="./icons/outline.png"></img>
        </div>
        <Link to={token ? "/guide" : "/signin"} onClick={notify}>
          <div className={styles.homeButton}>
            <p>View more</p>
          </div>
        </Link>
      </section>
      <section className={`container ${styles.honeAboutUs}`}>
        <div className={styles.homeText}>
          <div>
            <h2>About us</h2>
            <img src="./icons/line.png"></img>
          </div>
          <span>Information of the development team in this project.</span>
        </div>
        <div className={styles.homeAboutUsListItems}>
          <div className={styles.homeAboutUsItem}>
            <img src="./icons/trunghieu.png"></img>
            <p>Vo Trung Hieu</p>
          </div>
          <div className={styles.homeAboutUsItem}>
            <img src="./icons/lich.png"></img>
            <p>Nguyen Hong Lich</p>
          </div>
          <div className={styles.homeAboutUsItem}>
            <img src="./icons/tuan.png"></img>
            <p>HD Thanh Tuan</p>
          </div>
          <div className={styles.homeAboutUsItem}>
            <img src="./icons/ngochieu.png"></img>
            <p>Huynh Ngoc Hieu</p>
          </div>
          <div className={styles.homeAboutUsItem}>
            <img src="./icons/thuan.png"></img>
            <p>Le Van Thuan</p>
          </div>
        </div>
        <Link to="/about-us">
          <div className={styles.homeButton}>
            <p>View more</p>
          </div>
        </Link>
      </section>
      <section className={`container ${styles.homeReport}`}>
        <div className={styles.homeReportImg}>
          <img src="./icons/reportImg.png"></img>
        </div>
        <div className={styles.homeReportRight}>
          <div className={styles.homeReportText}>
            <h2>Report</h2>
            <img src="./icons/line.png"></img>
            <p>
              In this page. In the progress, If you have any problem. Please
              contact with developer team. Click View more to report this defect
              what you met.
            </p>
          </div>
          <Link to={token ? "/report" : "/signin"} onClick={notify}>
            <div className={styles.homeButton}>
              <p>View more</p>
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </body>
  );
};

export default Home;
