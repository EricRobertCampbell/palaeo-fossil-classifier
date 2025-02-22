"use client";
import { useState } from "react";
import { uploadFile } from "../actions/uploadFile";
import styles from "./page.module.css";
import { Button } from "../components/Button";
export default function Page() {
  const [selectedOption, setSelectedOption] = useState("all");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const [image, setImage] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleChange = () => {
    setSubmit(true);
  };

  return (
    <div>
      <form className={styles.form} action={uploadFile} onSubmit={handleChange}>
        <span className={styles.formtitle}>Upload your file</span>
        {image ? null : (
          <label htmlFor="file-input" className={styles.dropcontainer}>
            <p className={styles.formparagraph}>File should be an image</p>
            <span className={styles.droptitle}>Drop files here</span>
            or
            <input
              type="file"
              accept="image/*"
              name="file"
              required
              id={styles.fileinput}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(URL.createObjectURL(e.target.files[0]));
                  console.log(e);
                }
              }}
            />
          </label>
        )}
        {image && (
          <div className={styles.imagecontainer}>
            <img
              className={styles.imagepreview}
              src={image}
              alt="Selected file preview"
            />
            <input
              type="file"
              accept="image/*"
              name="file"
              id={styles.fileinput}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>
        )}
        <div className={styles.mydict}>
          <h2 className={styles.formtitle2}>Classification</h2>
          <div>
            <label className={styles.ll}>
              <input type="radio" name="classification" required value="rock" />
              <span>Rock</span>
            </label>
            <label className={styles.ll}>
              <input type="radio" name="classification" value="fossil" />
              <span>Fossil</span>
            </label>
          </div>
        </div>
        <Button className="">
          <div>Submit</div>
        </Button>
        {!submit ? (
          <div>
            <div className={styles.loader}>
              <div className={`${styles.circle} ${styles.circle1}`}></div>
              <div className={`${styles.circle} ${styles.circle2}`}></div>
              <div className={`${styles.circle} ${styles.circle3}`}></div>
              <div className={`${styles.circle} ${styles.circle4}`}></div>
            </div>
          </div>
        ) : (
          <p className={styles.formtitle2}>
            Congrats your image has been uploaded!
          </p>
        )}
      </form>
    </div>
  );
}
