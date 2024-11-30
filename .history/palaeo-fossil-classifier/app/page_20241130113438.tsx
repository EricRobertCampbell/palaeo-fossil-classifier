import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}> Palaeo Fossil Classifier </header>
      <main className={styles.main}>
        <button> enter to login</button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}