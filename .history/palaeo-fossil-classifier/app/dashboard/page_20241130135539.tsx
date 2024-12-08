import React from "react";
import "./page.module.css";

export default function dashboard() {
  return (
    <div>
      <h1>Welcome!</h1>
      <div className="area"></div>
      <nav className="main-menu">
        <ul>
          <li>
            <a>
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Upload Images</span>
            </a>
          </li>
          <li className="has-subnav">
            <a>
              <i className="fa fa-globe fa-2x"></i>
              <span className="nav-text">View Images</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
