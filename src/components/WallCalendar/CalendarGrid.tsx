"use client";

import { useCallback } from "react";
import { DateSelection } from "@/hooks/useCalendar";
import { getHoliday } from "@/lib/holidays";
import DayCell from "./DayCell";
import styles from "./CalendarGrid.module.css";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKEND_INDICES = new Set([5, 6]); // Sat, Sun (0-indexed Mon-first)

interface Props {
  year: number;
  month: number;
  selection: DateSelection;
  hoverDate: Date | null;
  daysInMonth: number;
  firstDayOfWeek: number;
  isToday: (d: Date) => boolean;
  isStart: (d: Date) => boolean;
  isEnd: (d: Date) => boolean;
  isInRange: (d: Date) => boolean;
  onDayClick: (d: Date) => void;
  onHoverDay: (d: Date | null) => void;
}

export default function CalendarGrid({
  year, month, selection, hoverDate,
  daysInMonth, firstDayOfWeek,
  isToday, isStart, isEnd, isInRange,
  onDayClick, onHoverDay,
}: Props) {
  // Build array of all cells (null = padding)
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const getDate = useCallback(
    (day: number) => new Date(year, month, day),
    [year, month]
  );

  // Effective end for hover preview
  const effectiveEnd = selection.end ?? (selection.start && hoverDate ? hoverDate : null);

  const isHoverRange = (date: Date) => {
    if (selection.end) return false; // range already set
    if (!selection.start || !hoverDate) return false;
    const s = selection.start < hoverDate ? selection.start : hoverDate;
    const e = selection.start < hoverDate ? hoverDate : selection.start;
    return date > s && date < e;
  };

  return (
    <div className={styles.grid}>
      {/* Week day headers */}
      <div className={styles.weekHeaders} role="row">
        {WEEK_DAYS.map((d, i) => (
          <div
            key={d}
            className={`${styles.weekDay}${WEEKEND_INDICES.has(i) ? " " + styles.weekend : ""}`}
            role="columnheader"
            aria-label={d}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day rows */}
      {weeks.map((week, wi) => (
        <div key={wi} className={styles.week} role="row">
          {week.map((day, di) => {
            const colIdx = di; // 0=Mon … 6=Sun
            const isWknd = WEEKEND_INDICES.has(colIdx);

            if (day === null) {
              return (
                <DayCell
                  key={`empty-${wi}-${di}`}
                  day={null}
                  date={null}
                  isWeekend={false}
                  isToday={false}
                  isStart={false}
                  isEnd={false}
                  isInRange={false}
                  isHoverRange={false}
                  isRangeStart={false}
                  isRangeEnd={false}
                  holiday={null}
                  onClick={() => {}}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              );
            }

            const date = getDate(day);
            const holiday = getHoliday(month, day);
            const inRange = isInRange(date);
            const hoverR = isHoverRange(date);

            // Determine if this cell is the leftmost/rightmost of a fill block
            const prevDay = week[di - 1];
            const nextDay = week[di + 1];

            const prevInRange =
              prevDay != null && (isInRange(getDate(prevDay)) || isHoverRange(getDate(prevDay)));
            const nextInRange =
              nextDay != null && (isInRange(getDate(nextDay)) || isHoverRange(getDate(nextDay)));

            const isRangeStart = (inRange || hoverR) && !prevInRange;
            const isRangeEnd   = (inRange || hoverR) && !nextInRange;

            return (
              <DayCell
                key={`day-${day}`}
                day={day}
                date={date}
                isWeekend={isWknd}
                isToday={isToday(date)}
                isStart={isStart(date)}
                isEnd={isEnd(date)}
                isInRange={inRange}
                isHoverRange={hoverR}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                holiday={holiday}
                onClick={() => onDayClick(date)}
                onMouseEnter={() => onHoverDay(date)}
                onMouseLeave={() => onHoverDay(null)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
