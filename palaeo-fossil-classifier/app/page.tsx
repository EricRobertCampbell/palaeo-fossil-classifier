import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.page}>
          <header className={styles.header}> Palaeo Fossil Classifier </header>

          <main className={styles.main}>
            <div className={styles.grid}>
              <p className={styles.content}>
                Helping experts identifying fossils
              </p>
            </div>
            <div>
              <Link href="./login">
                <button className={styles.button}>
                  <span className={styles.span}>Enter</span>
                </button>
              </Link>
            </div>
          </main>
        </div>

        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
