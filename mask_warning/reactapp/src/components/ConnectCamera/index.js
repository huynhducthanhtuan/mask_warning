import React, { useEffect, useState, useRef } from "react";
import styles from "./ConnectCamera.module.css";
import Header from "../Header";
import { toast } from "react-toastify";

const ConnectCamera = ({ setVideoStreamUrl }) => {
  const videoStreamInputRef = useRef();

  const validateVideoStreamUrl = (videoStreamUrl) => {
    const regex = new RegExp(
      /(rtsp):\/\/([^\s@/]+)@([^\s/:]+)(?::([0-9]+))?(\/.*)/gm
    );
    return regex.test(videoStreamUrl);
  };

  const handleConnectCamera = () => {
    const videoStreamUrl = videoStreamInputRef.current.value.trim();

    if (validateVideoStreamUrl(videoStreamUrl)) {
      localStorage.setItem("videoStream", videoStreamUrl);
      setVideoStreamUrl(videoStreamUrl);
    } else {
      toast.error("Invalid video stream format".toLocaleUpperCase());
    }
  };

  return (
    <section className={`container_fluid ${styles.camera}`}>
      <Header />
      <h1 className={`${styles.headerString} d-flex`}>Connect Camera</h1>
      <div className={styles.formContentPart}>
        <h2>Enter your camera video stream</h2>
        <div className={styles.inputPart}>
          <input
            className={styles.formControl}
            id="video-stream-input"
            placeholder="Ex: rtsp://admin:123@192.168.11.105:8080/onvif13"
            ref={videoStreamInputRef}
          />
        </div>
        <div className={styles.formButton}>
          <button
            className={styles.buttonConnect}
            onClick={handleConnectCamera}
          >
            Connect Camera
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConnectCamera;
