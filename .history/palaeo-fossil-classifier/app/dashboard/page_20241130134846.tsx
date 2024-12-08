import React from "react";

export default function dashboard() {
  return (
    <div>
      <h1>Welcome!</h1>
      <div className="area"></div>
      <nav className="main-menu">
        <ul>
          <li>
            <a href="https://jbfarrow.com">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">upload</span>
            </a>
          </li>
          <li className="has-subnav">
            <a href="#">
              <i className="fa fa-globe fa-2x"></i>
              <span className="nav-text">Global Surveyors</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
