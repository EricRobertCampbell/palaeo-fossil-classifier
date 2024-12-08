"use client";
import React from "react";
import "./page.module.css";
import { useState } from "react";
import Admin from "../admin";
import Classify from "../classify";

export default function dashboard() {
  const [component1, setComponent1] = useState(true);
  const [component2, setComponent2] = useState(false);

  const handleAdmin = () => {
    setComponent1(true);
    setComponent2(false);
  };
  const handleClasify = () => {
    setComponent2(true);
    setComponent1(false);
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <div className="area"></div>
      <nav className="main-menu">
        <ul>
          <li>
            <button
              onClick={() => {
                handleAdmin;
              }}
            >
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Upload Images</span>
            </button>
          </li>
          <li className="has-subnav">
            <button
              onClick={() => {
                handleClasify;
              }}
            >
              <i className="fa fa-globe fa-2x"></i>
              <span className="nav-text">View Images</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="component">{component1 ? <Admin /> : <></>}</div>
      <div className="component">{component2 ? <Classify /> : <></>}</div>
    </div>
  );
}
