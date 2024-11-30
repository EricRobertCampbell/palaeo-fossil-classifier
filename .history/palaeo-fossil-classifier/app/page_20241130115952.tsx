import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}> Palaeo Fossil Classifier </header>
      <main className={styles.main}>
        <div className={styles.buttons}>
          <Link href="/login">
            <button className={styles.btn}>
              <span></span>
              <p
                data-start="good luck!"
                data-text="login"
                data-title="login"
              ></p>
            </button>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
