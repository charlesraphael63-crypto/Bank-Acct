import React from "react";
import "../Components/Css/LoginPage.css";
import axios from "axios";
import { GiLoincloth } from "react-icons/gi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    emailAddress: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    err: false,
    name: "",
    msg: "",
  });
  // const [errorMsg2, setErrorMsg2] = useState("");

  const emailAddressRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const catchEmailAddress = (e) => {
    const newEmailAddress = e.target.value;
    setUserInfo({ ...userInfo, emailAddress: newEmailAddress });
    if (newEmailAddress.trim() === "") {
      setErrorMsg({
        err: true,
        name: "emailAddress",
        msg: "You must add your emailAddress address",
      });
    } else if (!emailAddressRegex.test(newEmailAddress)) {
      setErrorMsg({
        err: true,
        name: "emailAddress",
        msg: "Please enter a valid emailAddress address",
      });
    } else {
      setErrorMsg({ err: false, name: "", msg: "" });
    }
  };
  const catchPassword = (e) => {
    const newPassword = e.target.value;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    setUserInfo({ ...userInfo, password: newPassword });
    if (newPassword.trim() === "") {
      setErrorMsg({
        err: true,
        name: "password",
        msg: "You must add your password",
      });
    } else {
      setErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  // Working with Backend
  // console.log("USER INFO:", userInfo);
  const BaseURL = import.meta.env.VITE_BASE_URL;
  // const handleChange = (e) => {
  //   setUserInfo({
  //     ...userInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!userInfo.emailAddress || !userInfo.password) {
  //     alert("Email and password are required");
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${BaseURL}login`, userInfo);
  //     // console.log("Login success:", response.data);
  //     alert("Login successful");
  //     setUserInfo({
  //       emailAddress: "",
  //       password: "",
  //     });
  //     setIsLoading(false);
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Login failed");
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BaseURL}login`, userInfo);
      localStorage.setItem("token", res.data.token);
      if (res.status === Number(import.meta.env.VITE_status)) {
        nav("/landing-page");
      }
      alert(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <main className="authForm-container">
        <div className="authTitle-container">
          <nav className="authLogo-container">
            <img className="imgLogo" src="/src/assets/react.svg" alt="logo" />
            <p>The curve</p>
          </nav>
          <h2>Sign in to your account</h2>
        </div>
        <form className="authmain-container" onSubmit={handleSubmit2}>
          <section className="wrapAuth-container">
            <label htmlFor="emailAddress">EmailAddress</label>
            <input
              type="emailAddress"
              id="emailAddress"
              name="emailAddress"
              className="auth-input1"
              placeholder="example@gmail.com"
              required
              onChange={catchEmailAddress}
            />
            <span style={{ color: "blue" }}>
              {errorMsg.msg && errorMsg.name === "emailAddress"
                ? errorMsg.msg
                : ""}
            </span>
          </section>
          <section className="wrapAuth-container">
            <label htmlFor="password">Password</label>
            <div className="authInput-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="auth-input"
                placeholder="Enter your password"
                required
                onChange={catchPassword}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <span style={{ color: "blue" }}>
              {errorMsg.msg && errorMsg.name === "password" ? errorMsg.msg : ""}
            </span>

            <div className="authCheck-container">
              <input type="checkbox" className="auth-check" />
              <span>Remember me</span>
            </div>
          </section>
          <div className="authButton-container">
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => nav("/signup-page")}>Sign-up</span>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
