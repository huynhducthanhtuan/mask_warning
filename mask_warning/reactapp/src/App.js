import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
