import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/BottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav
      className="bottom-nav"
      role="navigation"
      aria-label="bottom navigation"
    >
      <Link
        className={"bn-item " + (location.pathname === "/home" ? "active" : "")}
        to="/home"
        aria-label="Home"
      >
        <div className="bn-icon">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="bn-label">Home</div>
      </Link>

      <Link
        className={
          "bn-item " + (location.pathname === "/saved" ? "active" : "")
        }
        to="/saved"
        aria-label="Saved"
      >
        <div className="bn-icon">
          <svg
            width="20"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M6 2h12v18l-6-3-6 3V2z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="bn-label">Saved</div>
      </Link>
    </nav>
  );
};

export default BottomNav;
