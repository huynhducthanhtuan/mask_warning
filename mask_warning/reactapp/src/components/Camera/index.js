import React, { useEffect, useState } from "react";
import styles from "./Camera.module.css";
import Header from "../Header";
import ConnectCamera from "../ConnectCamera";
import { toast } from "react-toastify";
import { isAuthenticated } from "../Auth";
import { getVideoStreamUrlAPI } from "../../apis";

const Camera = () => {
  const [videoStreamUrl, setVideoStreamUrl] = useState(null);

  const getVideoStreamUrl = () => {
    setVideoStreamUrl(localStorage.getItem("videoStreamUrl") || null);
  };

  const renderConnectCameraPage = () => {
    return <ConnectCamera setVideoStreamUrl={setVideoStreamUrl} />;
  };

  const renderCameraPage = () => {
    // Lấy userId từ localStorage
    const userId = isAuthenticated().user.userId || "";

    return (
      <section className={`container_fluid ${styles.camera}`}>
        <Header />
        <div className={styles.activeCamera}>
          <img
            className={styles.activeCamraImage}
            src={videoStreamUrl ? `/camera/${userId}/` : ""}
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

  useEffect(() => {
    getVideoStreamUrl();
  }, [videoStreamUrl]);

  return videoStreamUrl ? renderCameraPage() : renderConnectCameraPage();
};

export default Camera;
