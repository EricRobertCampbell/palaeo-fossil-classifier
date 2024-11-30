import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}> Palaeo Fossil Classifier </header>
      <main className={styles.main}>
        <div className={styles.buttons}>
          <a href="">
            <button className={styles.btn}>
              <span></span>
              <p
                data-start="good luck!"
                data-text="login"
                data-title="login"
              ></p>
            </button>
          </a>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
