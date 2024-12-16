"use client";
import styles from "./page.module.css";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
export default function Home() {
  const [emblaRef] = useEmblaCarousel();
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
            <div className={styles.buttons}>
              <Link href="./login">
                <button className={`${styles.button} ${styles.type1}`}>
                  <span className={styles.btntxt}>Enter</span>
                </button>{" "}
              </Link>
            </div>
          </main>
        </div>

        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
