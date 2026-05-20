import React, { useContext } from "react";
import "./Css/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  return (
    <header className="bankHeader">
      <section className="bankHeaderInner">
        <div className="bankHeaderLeft">
          <h1 className="bankHeaderLogo">The Curve Bank</h1>
        </div>
        <div className="bankHeaderRight">
          <span className="bankHeaderUser">John Doe</span>
          <button className="bankHeaderLogout" onClick={() => nav("/")}>
            Logout
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
