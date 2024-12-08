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
              <span className="nav-text">Community Dashboard</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
