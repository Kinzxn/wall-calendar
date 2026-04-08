"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true); // default dark

  useEffect(() => {
    const stored = localStorage.getItem("wall-cal-theme") ?? "dark";
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("wall-cal-theme", next ? "dark" : "light");
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className={styles.track}>
        <div className={`${styles.thumb}${dark ? " " + styles.dark : ""}`} />
      </div>
      <span className={styles.label}>{dark ? "dark" : "light"}</span>
    </button>
  );
}
