import React from "react";
import "../src/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Auth/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import SignUpPage from "./Auth/SignUpPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="landing-page" element={<LandingPage />} />
        <Route path="signup-page" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
