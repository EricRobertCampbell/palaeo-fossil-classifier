import { useState } from "react";
import { uploadFile } from "../actions/uploadFile";
import styles from "./page.module.css";
export default function Page() {
  const [selectedOption, setSelectedOption] = useState("all");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <form className={styles.form} action={uploadFile}>
        <span className={styles.formtitle}>Upload your file</span>
        <p className={styles.formparagraph}>File should be an image</p>
        <label htmlFor="file-input" className={styles.dropcontainer}>
          <span className={styles.droptitle}>Drop files here</span>
          or
          <input type="file" accept="image/*" required id={styles.fileinput} />
        </label>
        <div className={styles.mydict}>
          <h2 className={styles.formtitle2}>Classification</h2>
          <div>
            <label className={styles.ll}>
              <input type="radio" name="radio" value="Rock" />
              <span>Rock</span>
            </label>
            <label className={styles.ll}>
              <input type="radio" name="radio" value="Fossil" />
              <span>Fossil</span>
            </label>
          </div>
        </div>
        <button className={styles.btn}>Submit</button>
        <div>
          <div className={styles.loader}>
            <div className={`${styles.circle} ${styles.circle1}`}></div>
            <div className={`${styles.circle} ${styles.circle2}`}></div>
            <div className={`${styles.circle} ${styles.circle3}`}></div>
            <div className={`${styles.circle} ${styles.circle4}`}></div>
          </div>
        </div>
      </form>
    </div>
  );
}
