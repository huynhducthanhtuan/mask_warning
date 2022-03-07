import { Link } from "react-router-dom";
import HomePage from "./Home";
import LoginPage from "./Login";

export default function Login() {
    return (
         <>
           <Link to="/">HOME PAGE</Link>
           <Link to="/login" style={{marginLeft: "12px"}}>LOGIN PAGE</Link>
           <h1>LOGIN PAGE</h1>
         </>
      );
}
