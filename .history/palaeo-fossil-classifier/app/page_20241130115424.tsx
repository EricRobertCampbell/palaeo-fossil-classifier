import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}> Palaeo Fossil Classifier </header>
      <main className={styles.main}>
        <div className={styles.buttons}>
          <button className={styles.btn}>
            <span></span>
            <p
              data-start="good luck!"
              data-text="start!"
              data-title="login"
            ></p>
          </button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
