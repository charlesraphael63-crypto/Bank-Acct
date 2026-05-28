import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ValidateInput1, ValidateInputs } from "../Lib/HigherFunction";

const SignUpPage = () => {
  const nav = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    err: false,
    name: "",
    msg: "",
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
      emailAddress: newEmail,
    });
    if (newEmail.trim() === "") {
      setErrorMsg({
        err: true,
        name: "emailAddress",
        msg: "Provide your email",
      });
    } else if (!emailRegex.test(newEmail)) {
      setErrorMsg({
        err: true,
        name: "emailAddress",
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
      confirmPassword: newPassword,
    });
    if (newPassword.trim() === "") {
      setErrorMsg({
        err: true,
        name: "confirmPassword",
        msg: "Confirm your password",
      });
    } else if (newPassword !== userInfo.password) {
      setErrorMsg({
        err: true,
        name: "confirmPassword",
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
  const [Passmeet, setPassmeet] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  // Working with backend
  const Base_Url = import.meta.env.VITE_BASE_URL;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     userInfo.fullName &&
  //     userInfo.emailAddress &&
  //     userInfo.password &&
  //     userInfo.confirmPassword
  //   ) {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.post(`${BaseURL}register`, userInfo);
  //       // console.log("this is the url", response);
  //       alert("Signup successful! You can now log in.");
  //       setUserInfo({
  //         fullName: "",
  //         emailAddress: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //       setIsLoading(false);
  //       nav("/landing-page");
  //     } catch (error) {
  //       console.log(error.response?.data || error.message);
  //       setIsLoading(false);
  //     }
  //   } else {
  //     alert("Please fix the errors in the form below before submitting.");
  //   }
  // };

  // const handleSubmit2 = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (ValidateInputs(userInfo, errorMsg, setErrorMsg)) {
  //       const res = await axios.post(`${BaseURL}register`, userInfo);
  //       alert(res.data.message);
  //       if (res.status === 201 || res.status === 200) {
  //         nav("/");
  //       }
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.message);
  //     console.log(error);
  //   }
  // };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (ValidateInput1(errorMsg, setErrorMsg, userInfo)) {
        const res = await axios.post(`${Base_Url}register`, userInfo);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmitRequest = async (e) => {
  //   e.preventDefault();
  //   console.log("Submitting:", userInfo);

  //   if (!ValidateInput1(userInfo, setErrorMsg, errorMsg)) {
  //     console.log("Validation failed");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(`${BASE_URL}register`, userInfo);
  //     console.log("Response:", res);
  //     console.log("Data:", res.data);
  //   } catch (error) {
  //     console.log(
  //       "Request failed:",
  //       error.response?.status,
  //       error.response?.data,
  //     );
  //   }
  // };
  // useEffect(() => handleSubmitRequest(), []);

  return (
    <div className="auth-container">
      <main className="authForm-container">
        <div className="authTitle-container">
          <nav className="authLogo-container">
            <img className="imgLogo" src="/src/assets/react.svg" alt="logo" />
            <p>The curve</p>
          </nav>
          <h2>Sign up for your account</h2>
        </div>

        <form className="authmain-container" onSubmit={handleSubmitRequest}>
          <section className="wrapAuth-container">
            <label htmlFor="fullName">Full-name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
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
            <label htmlFor="emailAddress">Email address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="auth-input1"
              placeholder="example@gmail.com"
              required
              value={userInfo.emailAddress}
              onChange={catchEmail}
            />
            <span style={{ color: "red" }}>
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="authInput-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="auth-input"
                placeholder="Enter your password"
                required
                value={userInfo.confirmPassword}
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
              {errorMsg.msg && errorMsg.name === "confirmPassword"
                ? errorMsg.msg
                : ""}
            </span>
            <div className="authCheck-container">
              <input type="checkbox" className="auth-check" />
              <span>Remember me</span>
            </div>
          </section>
          <div className="authButton-container">
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign up"}
            </button>
            <p>
              Already have an account?{" "}
              <span onClick={() => nav("/")}>Sign-in</span>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUpPage;
