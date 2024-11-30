"use client";
import { useEffect, useState } from "react";
import { getImages } from "../actions/getImages";
import { getImageData } from "../actions/getImageData";

export default function DisplayImages() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async () => {
      const images = await getImages();
      setImages(images);
    })();
  }, []);
  return (
    <div>
      <h1>Display Images</h1>
      {images.map((image) => (
        <DisplayImage image={image} />
      ))}
    </div>
  );
}

function DisplayImage({ image }) {
  const [base64, setBase64] = useState("");

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
        <h5>{image.classification}</h5>
        <img
          src={`data:image/png;base64,${base64}`}
          alt={"testing"}
          height="200"
        />
      </div>
    );
  }
}
