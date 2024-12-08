"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}> Palaeo Fossil Classifier </header>
      <main className={styles.main}>
        <p>Welcome to the Palaeo Fossil Classifier!</p>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
