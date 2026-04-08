"use client";

import { useState, useCallback } from "react";

export interface DateSelection {
  start: Date | null;
  end: Date | null;
}

export function useCalendar() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selection, setSelection] = useState<DateSelection>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const goToPreviousMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
    setSelection({ start: null, end: null });
    setHoverDate(null);
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
    setSelection({ start: null, end: null });
    setHoverDate(null);
  }, []);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!selection.start || (selection.start && selection.end)) {
        // Start fresh selection
        setSelection({ start: date, end: null });
        setHoverDate(null);
      } else {
        // Complete the range
        if (date < selection.start) {
          setSelection({ start: date, end: selection.start });
        } else {
          setSelection({ start: selection.start, end: date });
        }
        setHoverDate(null);
      }
    },
    [selection]
  );

  const clearSelection = useCallback(() => {
    setSelection({ start: null, end: null });
    setHoverDate(null);
  }, []);

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfWeek = (year: number, month: number) => {
    // 0 = Mon, 6 = Sun  (ISO week, Mon-first)
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isToday = (date: Date) => {
    const t = today;
    return (
      date.getDate() === t.getDate() &&
      date.getMonth() === t.getMonth() &&
      date.getFullYear() === t.getFullYear()
    );
  };

  const isStart = (date: Date) =>
    selection.start !== null &&
    date.toDateString() === selection.start.toDateString();

  const isEnd = (date: Date) =>
    selection.end !== null &&
    date.toDateString() === selection.end.toDateString();

  const isInRange = (date: Date) => {
    const end = selection.end ?? (selection.start && hoverDate ? hoverDate : null);
    if (!selection.start || !end) return false;
    const s = selection.start < end ? selection.start : end;
    const e = selection.start < end ? end : selection.start;
    return date > s && date < e;
  };

  const selectedDaysCount = () => {
    if (!selection.start || !selection.end) return 0;
    const diff = Math.abs(
      selection.end.getTime() - selection.start.getTime()
    );
    return Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const daysUntilMonthEnd = () => {
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const diff = lastDay.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return {
    viewMonth,
    viewYear,
    today,
    selection,
    hoverDate,
    setHoverDate,
    goToPreviousMonth,
    goToNextMonth,
    handleDayClick,
    clearSelection,
    getDaysInMonth,
    getFirstDayOfWeek,
    isToday,
    isStart,
    isEnd,
    isInRange,
    selectedDaysCount,
    daysUntilMonthEnd,
  };
}
