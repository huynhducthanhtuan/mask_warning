import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Guide from "../components/Guide";
import Report from "../components/Report";
import GuideConnectCamera from "../components/GuideConnectCamera";
import GuideReportDefect from "../components/GuideReportDefect";
import ReportHistory from "../components/ReportHistory";
import ReportHistoryDetail from "../components/ReportHistoryDetail";
import Camera from "../components/Camera";
import ForgotPassword from "../components/Forgot password";
import AboutUs from "../components/AboutUs";
import SignIn from "../components/Signin";
import Footer from "../components/Footer";

const ScreensRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/connect-camera" element={<GuideConnectCamera />} />
      <Route path="/report-defect" element={<GuideReportDefect />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/report" element={<Report />} />
      <Route path="report-history" element={<ReportHistory />} />
      <Route path="report-history-detail" element={<ReportHistoryDetail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/footer" element={<Footer />} />
    </Routes>
  );
};
export default ScreensRoot;
