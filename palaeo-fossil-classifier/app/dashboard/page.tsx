"use client";
import React from "react";
import styles from "./page.module.css";
import { useState } from "react";
// import Admin from "../admin";
// import Classify from "../classify";
import Admin from "../upload/page";
import Classify from "../classify/page";

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
    <div className={styles.grid}>
      <div className={`${styles.base} ${styles.one}`}></div>
      <div className={`${styles.base} ${styles.two}`}></div>
      <div className={`${styles.base} ${styles.three}`}></div>
      <div className={styles.area}>
        <nav className={styles.left}>
          <ul className="ul">
            <li className="">
              <button
                className={styles.button}
                onClick={() => {
                  handleAdmin();
                }}
              >
                <span className="nav-text">Upload Images</span>
              </button>
            </li>
            <li className="">
              <button
                className={styles.button}
                onClick={() => {
                  handleClasify();
                }}
              >
                <span className="nav-text">View Pictures</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.comp}>
        <div className={styles.component}>{component1 ? <Admin /> : <></>}</div>
        <div className={styles.component}>
          {component2 ? <Classify /> : <></>}
        </div>
      </div>
    </div>
  );
}
