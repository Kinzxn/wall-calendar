"use client";

import { useState } from "react";
import { MonthTheme } from "@/lib/monthThemes";
import styles from "./HeroImage.module.css";

interface Props {
  theme: MonthTheme;
  year: number;
}

export default function HeroImage({ theme, year }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.hero}>
      {!loaded && <div className={styles.skeleton} />}
      {/* Use plain img to bypass Next.js image domain restrictions */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={theme.imageUrl}
        alt={theme.imageAlt}
        className={`${styles.img}${loaded ? " " + styles.loaded : ""}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)} // still remove skeleton on error
      />
      <div className={styles.overlay} />
      <div className={styles.label}>
        <span className={styles.labelMonth}>{theme.name}</span>
        <span className={styles.labelYear}>{year}</span>
      </div>
    </div>
  );
}
