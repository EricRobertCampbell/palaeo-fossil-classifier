"use client";
/* It would be really nice if this were able to be server-rendered */
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const defaultResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export const Carousel = ({ children, responsive = defaultResponsive }) => {
  return <MultiCarousel responsive={responsive}>{children}</MultiCarousel>;
};
