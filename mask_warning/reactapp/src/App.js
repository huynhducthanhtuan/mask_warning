import "./App.css"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ScreensRoot from "./screens/root";
import GlobalStyle from "./components/GlobalStyle";

function App() {
  return (
    <GlobalStyle>
      <BrowserRouter> 
        <ScreensRoot />
      </BrowserRouter>
    </GlobalStyle>
  );
}

export default App;
