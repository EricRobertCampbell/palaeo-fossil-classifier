"use client";
import { useEffect, useState } from "react";
import { getRandomImage } from "../actions/getRandomImage";
import { getImageData } from "../actions/getImageData";
import { classifyImage } from "../actions/classifyImage";

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
          console.log("onImageSelection");
          const image = await getRandomImage();
          setImage(image);
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

  if (base64) {
    return (
      <div
        key={image.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`data:image/png;base64,${base64}`}
          alt={"testing"}
          height="200"
        />
        {correct === true ? (
          <p>Correct!</p>
        ) : correct === false ? (
          <p>Incorrect!</p>
        ) : null}
        <button
          onClick={async () => {
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
          onClick={async () => {
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
    );
  }
}
