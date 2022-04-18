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
  Statistic,
  ProfileChangeInformation,
  ProfilePassword,
} from "../components";

import {
  AdminSignin,
  AdminHome,
  AdminReportsManager,
  AdminUsersManager,
  UserDetail,
} from "../components/Admin";
import Frame from "../components/Admin/Frame";

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
      <Route
        path="/profile-change-information"
        element={<ProfileChangeInformation />}
      />
      <Route path="/profile-password" element={<ProfilePassword />} />
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

      <Route path="/admin/signin" element={<AdminSignin />} />
      <Route path="/home/admin" element={<AdminHome />} />
      <Route path="/reports-manager" element={<AdminReportsManager />} />
      <Route path="/users-manager" element={<AdminUsersManager />} />
      <Route path="/users-manager/user-detail" element={<UserDetail />} />
      <Route path="/frame" element={<Frame />} />
    </Routes>
  );
};
export default ScreensRoot;
