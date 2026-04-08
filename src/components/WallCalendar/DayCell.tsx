"use client";

import { Holiday } from "@/lib/holidays";
import styles from "./DayCell.module.css";

interface Props {
  day: number | null;
  date: Date | null;
  isWeekend: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverRange: boolean;
  isRangeStart: boolean; // leftmost of range fill
  isRangeEnd: boolean;   // rightmost of range fill
  holiday: Holiday | null;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DayCell({
  day,
  isWeekend,
  isToday,
  isStart,
  isEnd,
  isInRange,
  isHoverRange,
  isRangeStart,
  isRangeEnd,
  holiday,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  if (day === null) {
    return <div className={styles.empty} aria-hidden="true" />;
  }

  const cls = [
    styles.dayCell,
    isWeekend ? styles.weekend : "",
    isToday ? styles.today : "",
    isStart ? styles.start : "",
    isEnd ? styles.end : "",
    isInRange ? styles.inRange : "",
    isHoverRange ? styles.hoverRange : "",
    isRangeStart && !isStart ? styles.rangeStart : "",
    isRangeEnd && !isEnd ? styles.rangeEnd : "",
  ]
    .filter(Boolean)
    .join(" ");

  const label = `Day ${day}${isToday ? ", today" : ""}${holiday ? `, ${holiday.name}` : ""}`;

  return (
    <button
      className={cls}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={label}
      tabIndex={0}
    >
      <span className={styles.dayNumber}>{day}</span>
      {holiday && (
        <>
          <span className={styles.holiday} aria-hidden="true">
            {holiday.emoji}
          </span>
          <span className={styles.tooltip}>{holiday.name}</span>
        </>
      )}
    </button>
  );
}
