import React from "react"
import {Routes, Route } from "react-router-dom"
import Home from "../components/Home"
import Guide from "../components/Guide"
import Report from "../components/Report"
import GuideConnectCamera from "../components/GuideConnectCamera"
import GuideReportDefect from "../components/GuideReportDefect"
import Camera from "../components/Camera"
import ForgotPassword from "../components/Forgot password"
import AboutUs from "../components/AboutUs"
import SignIn from "../components/Signin"
import Footer from "../components/Footer"

import SignInAdmin from "../components/Admin/AdminSignin"
import HomeAdmin from "../components/Admin/AdminHome"
import ReportsManagerAdmin from "../components/Admin/AdminReportsManager"
import ReportDetailAdmin from "../components/Admin/AdminReportDetail"



const ScreensRoot  = () => {
    return (
      <Routes>  
        <Route path="/"        element={ <Home /> } />  
        <Route path="/guide" element={ <Guide />} />
        <Route path="/connect-camera" element={ <GuideConnectCamera />} />
        <Route path="/report-defect" element={ <GuideReportDefect />} />
        <Route path="/camera" element={ <Camera />} />
        <Route path="/report" element={ <Report />} />
        <Route path="/forgot-password" element={ <ForgotPassword />} />
        <Route path="/about-us" element={ <AboutUs />} />
        <Route path="/signIn"   element={ <SignIn />} />
        <Route path="/footer"   element={ <Footer />} />

        <Route path="/signinAdmin"   element={ <SignInAdmin />} />
        <Route path="/homeAdmin"   element={ <HomeAdmin />} />
        <Route path="/reportsManager"   element={ <ReportsManagerAdmin />} />

        <Route path="/reportDetail"   element={ <ReportDetailAdmin />} />


      </Routes>
    )
}
export default ScreensRoot 
