import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Guide,
  GuideConnectCamera,
  GuideReportDefect,
  Camera,
  Report,
  ReportHistory,
  ReportHistoryDetail,
  AboutUs,
  Signin,
  Profile,
  ForgotPassword,
  ForgotPasswordEnterCode,
  ForgotPasswordCreateNewPassword,
  ChangePassword,
  Footer,
  AdminSignin,
  AdminHome,
  Statistic,
} from "../components";

const ScreensRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/guide-connect-camera" element={<GuideConnectCamera />} />
      <Route path="/guide-report-defect" element={<GuideReportDefect />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report-history" element={<ReportHistory />} />
      <Route path="/report-history-detail" element={<ReportHistoryDetail />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin-signin" element={<AdminSignin />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/statistic" element={<Statistic />} />
      <Route
        path="/forgot-password-enter-code"
        element={<ForgotPasswordEnterCode />}
      />
      <Route
        path="/forgot-password-create-new-password"
        element={<ForgotPasswordCreateNewPassword />}
      />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/footer" element={<Footer />} />
    </Routes>
)}
export default ScreensRoot;
