import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Guide,
  GuideConnectCamera,
  GuideReportDefect,
  ConnectCamera,
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
  AdminReportDetail,
  AdminReportUserDetail,
  UserDetail,
  AdminCreateUser,
} from "../components/Admin";

const ScreensRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/guide-connect-camera" element={<GuideConnectCamera />} />
      <Route path="/guide-report-defect" element={<GuideReportDefect />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/connect-camera" element={<ConnectCamera />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report-history" element={<ReportHistory />} />
      <Route
        path="/report-history-detail/:reportId"
        element={<ReportHistoryDetail />}
      />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/statistic" element={<Statistic />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/profile-change-information"
        element={<ProfileChangeInformation />}
      />
      <Route path="/profile-password" element={<ProfilePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/forgot-password-enter-code"
        element={<ForgotPasswordEnterCode />}
      />
      <Route
        path="/forgot-password-create-new-password"
        element={<ForgotPasswordCreateNewPassword />}
      />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="/admin/signin" element={<AdminSignin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/users-manager" element={<AdminUsersManager />} />
      <Route
        path="/admin/users-manager/create-user"
        element={<AdminCreateUser />}
      />
      <Route
        path="/admin/users-manager/user-detail/:userId"
        element={<UserDetail />}
      />
      <Route
        path="/admin/reports-manager/report-detail/:reportId"
        element={<AdminReportDetail />}
      />
      <Route
        path="/admin/reports-manager/user-detail/:userId"
        element={<AdminReportUserDetail />}
      />
      <Route
        path="/admin/user-manager/user-detail/:userId"
        element={<UserDetail />}
      />
      <Route path="/admin/reports-manager" element={<AdminReportsManager />} />
    </Routes>
  );
};

export default ScreensRoot;
