"use client";
import { useEffect, useState } from "react";
import { getRandomImage } from "../actions/getRandomImage";
import { getImageData } from "../actions/getImageData";
import { classifyImage } from "../actions/classifyImage";
import styles from "./page.module.css";

export default function Classify() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      const image = await getRandomImage();
      setImage(image);
    })();
  }, []);
  if (image) {
    return (
      <ClassifyImage
        image={image}
        onImageSelection={async () => {
          setTimeout(async () => {
            console.log("onImageSelection");
            const image = await getRandomImage();
            setImage(image);
          }, 2000);
        }}
      />
    );
  }
  return null;
}

function ClassifyImage({ image, onImageSelection }) {
  const [base64, setBase64] = useState("");
  const [correct, setCorrect] = useState<undefined | boolean>();
  const user = { id: 1 };

  useEffect(() => {
    (async () => {
      const base64 = await getImageData(image.id);
      setBase64(base64);
    })();
  }, [image.id]);

  useEffect(() => {
    setCorrect(undefined);
  }, [image.id]);

  if (base64) {
    return (
      <div
        className={styles.form}
        key={image.id}
        style={{
          backgroundColor:
            correct === true
              ? "#20c997"
              : correct === false
              ? "#dc3545"
              : "#FFFFFF",
          boxShadow:
            correct === true
              ? "0 10px 60px #20c997"
              : correct === false
              ? "0 10px 60px rgb(148, 6, 21)"
              : "0 10px 60px rgb(218, 229, 255)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "top",
          transition: "ease 0.5s",
        }}
      >
        <img
          src={`data:image/png;base64,${base64}`}
          alt={"testing"}
          className={styles.image}
        />
        <p
          style={{
            marginTop: "10px",
          }}
        >
          {correct === true
            ? "Correct!"
            : correct === false
            ? "Incorrect!"
            : ""}
        </p>
        <div className={styles.group}>
          <button
            className={styles.button}
            onClick={async () => {
              console.log("Click rock");
              setCorrect(image.classification === "rock");
              await classifyImage({
                imageId: image.id,
                userId: user.id,
                classification: "rock",
              });
              await onImageSelection();
            }}
          >
            Rock
          </button>
          <button
            className={styles.button}
            onClick={async () => {
              console.log("Click fossil");
              setCorrect(image.classification === "fossil");
              await classifyImage({
                imageId: image.id,
                userId: user.id,
                classification: "fossil",
              });
              await onImageSelection();
            }}
          >
            Fossil
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
