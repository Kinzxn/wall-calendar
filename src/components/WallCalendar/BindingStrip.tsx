import styles from "./BindingStrip.module.css";

const HOLE_COUNT = 14;

export default function BindingStrip() {
  return (
    <div className={styles.strip} role="presentation" aria-hidden="true">
      {Array.from({ length: HOLE_COUNT }).map((_, i) => (
        <div key={i} className={styles.hole} />
      ))}
    </div>
  );
}
