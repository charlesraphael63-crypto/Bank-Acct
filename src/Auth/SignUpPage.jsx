import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const nav = useNavigate();
  return (
    <div className="auth-container">
      <form className="authForm-container">
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
              type="name"
              name="name"
              className="auth-input1"
              placeholder="enter your full name"
              required
            />
          </section>
          <section className="wrapAuth-container">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="auth-input1"
              placeholder="example@gmail.com"
              required
            />
          </section>
          <section className="wrapAuth-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="auth-input1"
              placeholder="confirm your password"
              required
            />
          </section>
          <section className="wrapAuth-container">
            <label htmlFor="password">Confirm Password</label>
            <div className="authInput-container">
              <input
                type={"password"}
                name="password"
                className="auth-input"
                placeholder="Enter your password"
                required
                onChange={""}
              />
              <button type="button" className="toggle_password"></button>
            </div>

            <div className="authCheck-container">
              <input type="checkbox" className="auth-check" />
              <span>Remember me</span>
            </div>
          </section>
        </main>
        <div className="authButton-container">
          <button
            type="submit"
            className="auth-btn"
            onClick={() => nav("/landing-page")}
          >
            Sign in
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
