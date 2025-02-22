"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../Button";
import { signIn, useSession } from "next-auth/react";
import styles from "./UserMenuButton.module.css";
import { signOut } from "next-auth/react";

export const UserMenuButton = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const session = useSession();

  console.log({ session });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session.data?.user) {
    return (
      <Button
        className={styles.button}
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </Button>
    );
  }
  console.log({ img: session.data.user.image });
  return (
    <div className={styles.dropdown} ref={menuRef}>
      <Button onClick={() => setMenuOpen(true)} className={styles.button}>
        {session.data.user.image ? (
          <img
            style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
            src={session.data.user.image}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : null}
        {session.data.user
          ? session.data.user.name || session.data.user.email || "User"
          : "Login"}
      </Button>
      {menuOpen ? (
        <div className={styles.menu}>
          <Button
            className={styles.menuItem}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Home
          </Button>
          <Button
            className={styles.menuItem}
            onClick={() => {
              signOut();
              // setMenuOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
};
