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
  const [correct, setCorrect] = useState<undefined | number>(0);
  const user = { id: 1 };

  useEffect(() => {
    (async () => {
      const base64 = await getImageData(image.id);
      setBase64(base64);
    })();
  }, [image.id]);

  useEffect(() => {
    setCorrect(0);
  }, [image.id]);

  if (base64) {
    return (
      <div
        className={styles.form}
        key={image.id}
        style={{
          backgroundColor:
            correct === 0 ? "#FFFFFF" : correct === 1 ? "#20c997" : "#dc3545",
          boxShadow:
            correct === 0
              ? "0 10px 60px rgb(218, 229, 255)"
              : correct === 1
              ? "0 10px 60px #20c997"
              : "0 10px 60px rgb(148, 6, 21)",
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
        {correct === 1 ? (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Correct!
          </p>
        ) : correct === 2 ? (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Incorrect!
          </p>
        ) : null}
        <div className={styles.group}>
          <button
            className={styles.button}
            onClick={async () => {
              console.log("Click rock");
              if (image.classification === "rock") {
                setCorrect(1);
              } else {
                setCorrect(2);
              }
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
              console.log("Click rock");
              if (image.classification === "fossil") {
                setCorrect(1);
              } else {
                setCorrect(2);
              }
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
  }
}
