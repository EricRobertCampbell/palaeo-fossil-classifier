import styles from "./page.module.css";
import { addUser } from "../actions/addUser";

export default function Register() {
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Register</h1>
      <form action={addUser} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          name="email"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
        />
        <button className={styles.button}> Register </button>
      </form>
      <a href="./login">
        {" "}
        <button className={styles.button2}> Have an account? Login </button>
      </a>
    </div>
  );
}
