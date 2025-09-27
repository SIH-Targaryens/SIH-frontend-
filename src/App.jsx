import React from "react";
import { AuthProvider } from "./AuthContext";
import Colleges from "./pages/Colleges";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Colleges />
      <ChatBot />
    </AuthProvider>
  );
}

export default App;
