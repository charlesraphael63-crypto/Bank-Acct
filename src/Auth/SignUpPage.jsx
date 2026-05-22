import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const nav = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    secPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    err: false,
    name: "",
    msg: "",
  });

  // Working with backend
  const [Passmeet, setPassmeet] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    err: false,
    strength: "",
    msg: "",
  });

  const passwordStrengthRegex = {
    weak: /^.{0,7}$/,
    good: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
    strong:
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#%^&*()_+\[\]{};':"\\|,.<>\/?]).{10,}$/,
  };

  const handlePassword = (e) => {
    const updatePassword = e.target.value;

    setUserInfo({
      ...userInfo,
      password: updatePassword,
    });

    setPassmeet({
      length: updatePassword.length >= 8,
      upper: /[A-Z]/.test(updatePassword),
      lower: /[a-z]/.test(updatePassword),
      number: /\d/.test(updatePassword),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(updatePassword),
    });

    if (updatePassword.trim() === "") {
      setPasswordStrength({
        err: true,
        strength: "",
        msg: "You must add a password",
      });

      setErrorMsg({
        err: true,
        name: "password",
        msg: "your password is required",
      });
    } else if (passwordStrengthRegex.strong.test(updatePassword)) {
      setPasswordStrength({
        err: true,
        strength: "Strong",
      });

      setErrorMsg({
        err: false,
        name: "",
        msg: "",
      });
    } else if (passwordStrengthRegex.good.test(updatePassword)) {
      setPasswordStrength({
        err: true,
        strength: "Good",
      });

      setErrorMsg({
        err: false,
        name: "",
        msg: "",
      });
    } else {
      setPasswordStrength({
        err: true,
        strength: "Weak",
      });
    }
  };

  const catchFullname = (e) => {
    const newFullName = e.target.value;

    setUserInfo({
      ...userInfo,
      fullName: newFullName,
    });

    if (newFullName.trim() === "") {
      setErrorMsg({
        err: true,
        name: "fullName",
        msg: "Enter your full name is required",
      });
    } else {
      setErrorMsg({
        err: false,
        name: "",
        msg: "",
      });
    }
  };

  const catchEmail = (e) => {
    const newEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setUserInfo({
      ...userInfo,
      email: newEmail,
    });

    console.log(newEmail);

    if (newEmail.trim() === "") {
      setErrorMsg({
        err: true,
        name: "email",
        msg: "Provide your email",
      });
    } else if (!emailRegex.test(newEmail)) {
      setErrorMsg({
        err: true,
        name: "email",
        msg: "enter a valid email address",
      });
    } else {
      setErrorMsg({
        err: false,
        name: "",
        msg: "",
      });
    }
  };
  const catchPasswordConfirm = (e) => {
    const newPassword = e.target.value;

    setUserInfo({
      ...userInfo,
      secPassword: newPassword,
    });

    console.log(newPassword);

    if (newPassword.trim() === "") {
      setErrorMsg({
        err: true,
        name: "secPassword",
        msg: "Confirm your password",
      });
    } else if (newPassword !== userInfo.password) {
      setErrorMsg({
        err: true,
        name: "secPassword",
        msg: "Passwords do not match",
      });
    } else {
      setErrorMsg({
        err: false,
        name: "",
        msg: "",
      });
    }
  };

  // cond't
  const BaseURL = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userInfo.fullName &&
      userInfo.email &&
      userInfo.password &&
      userInfo.secPassword
    ) {
      try {
        setIsLoading(true);
        const response = await axios.post(`${BaseURL}/register`, userInfo);
        console.log("this is the url", response);
        alert("Signup successful! You can now log in.");
        setUserInfo({
          fullName: "",
          email: "",
          password: "",
          secPassword: "",
        });
        setIsLoading(false);
        nav("/landing-page");
      } catch (error) {
        console.log(error.response?.data || error.message);
        setIsLoading(false);
      }
    } else {
      alert("Please fix the errors in the form below before submitting.");
    }
  };

  return (
    <div className="auth-container">
      <form className="authForm-container" onSubmit={handleSubmit}>
        <div className="authTitle-container">
          <nav className="authLogo-container">
            <img className="imgLogo" src="/src/assets/react.svg" alt="logo" />
            <p>The curve</p>
          </nav>
          <h2>Sign up for your account</h2>
        </div>

        <main className="authmain-container">
          <section className="wrapAuth-container">
            <label htmlFor="name">Full-name</label>
            <input
              type="text"
              name="name"
              className="auth-input1"
              placeholder="enter your full name"
              required
              value={userInfo.fullName}
              onChange={catchFullname}
            />
            <span style={{ color: "blue" }}>
              {errorMsg.msg && errorMsg.name === "fullName" ? errorMsg.msg : ""}
            </span>
          </section>

          <section className="wrapAuth-container">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="auth-input1"
              placeholder="example@gmail.com"
              required
              value={userInfo.email}
              onChange={catchEmail}
            />
            <span style={{ color: "red" }}>
              {errorMsg.msg && errorMsg.name === "email" ? errorMsg.msg : ""}
            </span>
          </section>

          <section className="wrapAuth-container">
            <label htmlFor="password">Password</label>
            <div className="authInput-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="auth-input"
                placeholder="enter your password"
                required
                value={userInfo.password}
                onChange={handlePassword}
                onFocus={() => setShowText(true)}
                onBlur={() => setShowText(false)}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordStrength.err && (
              <main
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#beefe3",
                }}
              >
                <div
                  style={{
                    width: `${
                      passwordStrength.strength === "Weak"
                        ? "30%"
                        : passwordStrength.strength === "Good"
                          ? "60%"
                          : passwordStrength.strength === "Strong"
                            ? "90%"
                            : ""
                    }`,
                    height: "1px",
                    padding: "2px",
                    background: `${
                      passwordStrength.strength === "Weak"
                        ? "red"
                        : passwordStrength.strength === "Good"
                          ? "yellow"
                          : passwordStrength.strength === "Strong"
                            ? "green"
                            : ""
                    }`,
                  }}
                />
              </main>
            )}
            <span style={{ color: "red" }}>
              {errorMsg.msg && errorMsg.name === "password" ? errorMsg.msg : ""}
            </span>
            {showText && (
              <div
                style={{
                  display: "grid",
                  gap: "5px",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    color: Passmeet.length ? "green" : "red",
                    margin: 0,
                  }}
                >
                  {Passmeet.length ? "✔️" : "●"} Must have 8+ characters
                </p>
                <p
                  style={{
                    color: Passmeet.upper ? "green" : "red",
                    margin: 0,
                  }}
                >
                  {Passmeet.upper ? "✔️" : "●"} Must contain uppercase
                </p>
                <p
                  style={{
                    color: Passmeet.lower ? "green" : "red",
                    margin: 0,
                  }}
                >
                  {Passmeet.lower ? "✔️" : "●"} Must contain lowercase
                </p>
                <p
                  style={{
                    color: Passmeet.number ? "green" : "red",
                    margin: 0,
                  }}
                >
                  {Passmeet.number ? "✔️" : "●"} Must contain numbers
                </p>
                <p
                  style={{
                    color: Passmeet.special ? "green" : "red",
                    margin: 0,
                  }}
                >
                  {Passmeet.special ? "✔️" : "●"} Add special characters
                </p>
              </div>
            )}
          </section>

          <section className="wrapAuth-container">
            <label htmlFor="password">Confirm Password</label>
            <div className="authInput-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="secPassword"
                className="auth-input"
                placeholder="Enter your password"
                required
                value={userInfo.secPassword}
                onChange={catchPasswordConfirm}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <span style={{ color: "red" }}>
              {errorMsg.msg && errorMsg.name === "secPassword"
                ? errorMsg.msg
                : ""}
            </span>
            <div className="authCheck-container">
              <input type="checkbox" className="auth-check" />
              <span>Remember me</span>
            </div>
          </section>
        </main>
        <div className="authButton-container">
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </button>
          <p>
            Don't have an account? <span onClick={() => nav("/")}>Sign-in</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
