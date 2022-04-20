import React, { useEffect, useState } from "react";
import styles from "./Camera.module.css";
import Header from "../Header";
import { toast } from "react-toastify";
import ConnectCamera from "../ConnectCamera";

const Camera = () => {
  const [videoStreamUrl, setVideoStreamUrl] = useState("");

  const getVideoStreamUrl = () => {
    if (localStorage.getItem("videoStream")) {
      setVideoStreamUrl(localStorage.getItem("videoStream"));
    }
  };

  const renderConnectCameraPage = () => {
    return <ConnectCamera setVideoStreamUrl={setVideoStreamUrl} />;
  };

  const renderCameraPage = () => {
    return (
      <section className={`container_fluid ${styles.camera}`}>
        <Header />
        <div className={styles.activeCamera}>
          <img
            className={styles.activeCamraImage}
            src={`/camera/${videoStreamUrl}`}
            alt="camera video"
          />
          <div className={styles.speaker}>
            <img src="./icons/speaker.png"></img>
            <p>Notification</p>
          </div>
        </div>
      </section>
    );
  };

  const handleToggleRenderCameraPage = () => {
    if (localStorage.getItem("videoStream")) {
      return renderCameraPage();
    } else {
      return renderConnectCameraPage();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getVideoStreamUrl();
  }, [videoStreamUrl]);

  return handleToggleRenderCameraPage();
};

export default Camera;
