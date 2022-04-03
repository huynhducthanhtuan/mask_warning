import "./App.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScreensRoot from "./screens/root";
import GlobalStyle from "./components/GlobalStyle";
import { ToastContainer, toast } from "react-toastify";
//hello
function App() {
  return (
    <GlobalStyle>
      <ToastContainer position="top-center" autoClose={1000} type="default" />
      <BrowserRouter>
        <ScreensRoot />
      </BrowserRouter>
    </GlobalStyle>
  );
}

export default App;
