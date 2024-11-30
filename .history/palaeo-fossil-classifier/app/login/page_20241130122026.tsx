import React from "react";

export default function login() {
  return (
    <div>
      <h1>Login</h1>
      <div class="login-wrap">
        <h2>Login</h2>

        <div class="form">
          <input type="text" placeholder="Username" name="un" />
          <input type="password" placeholder="Password" name="pw" />
          <button> Sign in </button>
          <a href="#">
            {" "}
            <p> Don't have an account? Register </p>
          </a>
        </div>
      </div>
    </div>
  );
}
