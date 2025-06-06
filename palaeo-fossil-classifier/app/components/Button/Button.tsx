import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<{}>, PropsWithChildren {}
export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={[className, styles.button].join(" ")} {...rest}>
      {children}
    </button>
  );
};
