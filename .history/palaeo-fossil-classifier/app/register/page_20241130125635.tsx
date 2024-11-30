import React from "react";

export default function classify() {
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
        <button className={styles.button}> Sign in </button>
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
