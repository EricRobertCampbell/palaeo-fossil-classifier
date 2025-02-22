"use client";
import styles from "./page.module.css";
import { addUser } from "../actions/addUser";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleImage from "../../public/icons/google.png";
import Image from "next/image";

export default function Register() {
  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
        <button
          className={styles.google}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={GoogleImage} alt="Google Logo" height={60} />
        </button>
        <p
          style={{
            marginTop: "calc(4 * var(--base-spacing))",
            fontSize: "2rem",
          }}
        >
          or
        </p>
        <form
          action={async (f) => {
            const result = await addUser(f);
            console.log({ result });
            console.log({
              email: f.get("email"),
              password: f.get("password"),
            });
            signIn("credentials", {
              username: f.get("email"),
              password: f.get("password"),
              callbackUrl: "/",
            });
          }}
          className={styles.form}
        >
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
