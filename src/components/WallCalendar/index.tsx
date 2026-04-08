"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MONTH_THEMES } from "@/lib/monthThemes";
import { DateSelection } from "@/hooks/useCalendar";
import BindingStrip from "./BindingStrip";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import styles from "./WallCalendar.module.css";

interface Props {
  viewMonth: number;
  viewYear: number;
  selection: DateSelection;
  hoverDate: Date | null;
  daysInMonth: number;
  firstDayOfWeek: number;
  selectedDaysCount: number;
  daysUntilMonthEnd: number;
  isToday: (d: Date) => boolean;
  isStart: (d: Date) => boolean;
  isEnd: (d: Date) => boolean;
  isInRange: (d: Date) => boolean;
  onPrev: () => void;
  onNext: () => void;
  onDayClick: (d: Date) => void;
  onHoverDay: (d: Date | null) => void;
  onClear: () => void;
}

export default function WallCalendar({
  viewMonth, viewYear, selection, hoverDate,
  daysInMonth, firstDayOfWeek,
  selectedDaysCount, daysUntilMonthEnd,
  isToday, isStart, isEnd, isInRange,
  onPrev, onNext, onDayClick, onHoverDay, onClear,
}: Props) {
  const theme = MONTH_THEMES[viewMonth];
  const directionRef = useRef<1 | -1>(1);
  const prevMonthRef = useRef(viewMonth);

  if (prevMonthRef.current !== viewMonth) {
    directionRef.current =
      viewMonth > prevMonthRef.current ||
      (prevMonthRef.current === 11 && viewMonth === 0)
        ? 1
        : -1;
    prevMonthRef.current = viewMonth;
  }

  const pageKey = `${viewYear}-${viewMonth}`;
  const dir = directionRef.current;

  const variants = {
    enter:  { rotateY: dir * 80, opacity: 0 },
    center: { rotateY: 0, opacity: 1 },
    exit:   { rotateY: dir * -80, opacity: 0 },
  };

  return (
    <div className={styles.wrapper}>
      <BindingStrip />

      {/* Navigation */}
      <div className={styles.nav}>
        <button className={styles.navBtn} onClick={onPrev} aria-label="Previous month">‹</button>
        <div className={styles.navCenter}>
          <span className={styles.monthLabel}>{theme.name}</span>
          <span className={styles.yearLabel}>{viewYear}</span>
        </div>
        <button className={styles.navBtn} onClick={onNext} aria-label="Next month">›</button>
      </div>

      {/* Stats row */}
      <div className={styles.stats}>
        {selection.start && selection.end ? (
          <>
            <div className={`${styles.stat} ${styles.statActive}`}>
              <span className={styles.statDot} />
              {selectedDaysCount} day{selectedDaysCount !== 1 ? "s" : ""} selected
            </div>
            <button className={styles.clearBtn} onClick={onClear}>clear</button>
          </>
        ) : selection.start ? (
          <div className={styles.stat}>
            <span className={styles.statDot} />
            select end date
          </div>
        ) : (
          <div className={styles.stat}>
            <span className={styles.statDot} />
            {daysUntilMonthEnd}d until month end
          </div>
        )}
      </div>

      {/* Page-flip animated content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pageKey}
          className={styles.flipOuter}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ perspective: 1200 }}
        >
          <HeroImage theme={theme} year={viewYear} />
          <CalendarGrid
            year={viewYear}
            month={viewMonth}
            selection={selection}
            hoverDate={hoverDate}
            daysInMonth={daysInMonth}
            firstDayOfWeek={firstDayOfWeek}
            isToday={isToday}
            isStart={isStart}
            isEnd={isEnd}
            isInRange={isInRange}
            onDayClick={onDayClick}
            onHoverDay={onHoverDay}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
