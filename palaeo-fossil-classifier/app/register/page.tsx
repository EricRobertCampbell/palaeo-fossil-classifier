import styles from "./page.module.css";
import { addUser } from "../actions/addUser";
import Link from "next/link";

export default function Register() {
  const handleUser = async (formData: FormData) => {
    "use server";
    await addUser(formData);
  };
  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
        <form action={handleUser} className={styles.form}>
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
          <Link href="./login">
            {" "}
            <button className={styles.button2}> Have an account? Login </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
