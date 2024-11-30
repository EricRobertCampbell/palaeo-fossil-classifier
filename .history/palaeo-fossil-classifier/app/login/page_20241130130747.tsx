import React from "react";
import styles from "./page.module.css";

export default function login() {
const handleClick = () => {
    const un = document.querySelector("input[name=un]").value;
    const pw = document.querySelector("input[name=pw]").value;
    if (un === "admin" && pw === "admin") {
      window.location.href = "./admin";
    } else {
      alert("Invalid username or password");
}

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          name="un"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="pw"
        />
        <button className={styles.button} onClick={handleClick}> Sign in </button>
        <a href="./register">
          {" "}
          <button className={styles.button2}>
            {" "}
            Don't have an account? Register{" "}
          </button>
        </a>
      </div>
    </div>
  );
}
