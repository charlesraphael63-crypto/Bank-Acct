import React from "react";
import "../Components/Css/LoginPage.css";

const LoginPage = () => {
  return (
    <div>
      <main className="login-container">
        <section className="login-card">
          <h1 className="login-title">Login</h1>

          <form className="login-form">
            <input
              type="email"
              placeholder="email address"
              className="login-input"
            />
            <input
              type="password"
              placeholder="password"
              className="login-input"
            />

            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
          <button className="sign_up">Sign Up</button>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
