"use client";
import React from "react";
import "./page.module.css";
import { useState } from "react";
import Admin from "../admin";
import Classify from "../classify";

export default function dashboard() {
  const [component1, setComponent1] = useState(false);
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
      <div className="area">
        <nav className="main-menu">
          <ul>
            <button
              className="button"
              onClick={() => {
                handleAdmin();
              }}
            >
              <span className="nav-text">Upload Images</span>
            </button>
            <button
              className="button"
              onClick={() => {
                handleClasify();
              }}
            >
              <span className="nav-text">View Images</span>
            </button>
          </ul>
        </nav>
        <div className="component">{component1 ? <Admin /> : <></>}</div>
        <div className="component">{component2 ? <Classify /> : <></>}</div>
      </div>
    </div>
  );
}
