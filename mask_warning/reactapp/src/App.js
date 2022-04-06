import "./App.css";
import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ScreensRoot from "./screens/root";
import GlobalStyle from "./components/GlobalStyle";
import { ToastContainer, toast } from "react-toastify";
import { reducer, initialState } from "./reducers/userReducer";
import { initialLocalStorageConfig } from "./components/Auth";
import { ForgotPasswordContextProvider } from "./contexts/ForgotPasswordContext";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <GlobalStyle>
        {initialLocalStorageConfig()}
        <ToastContainer position="top-center" autoClose={1000} type="default" />
        <BrowserRouter>
          <ForgotPasswordContextProvider>
            <ScreensRoot />
          </ForgotPasswordContextProvider>
        </BrowserRouter>
      </GlobalStyle>
    </UserContext.Provider>
  );
}

export default App;
