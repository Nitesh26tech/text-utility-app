import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ title, mode, toggleMode }) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} fixed-top`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {title}
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>

        <div
          className={`form-check form-switch text-${
            mode === "light" ? "dark" : "light"
          }`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            onClick={toggleMode}
          />
          <label className="form-check-label">Dark Mode</label>
        </div>
      </div>
    </nav>
  );
}
