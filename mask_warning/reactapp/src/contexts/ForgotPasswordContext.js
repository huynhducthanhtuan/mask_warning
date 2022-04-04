import { useState, createContext } from "react";

// Context
const ForgotPasswordContext = createContext();

// Provider
function ForgotPasswordContextProvider({ children }) {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  return (
    <ForgotPasswordContext.Provider value={{ code, setCode, email, setEmail }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
}

export { ForgotPasswordContext, ForgotPasswordContextProvider };
