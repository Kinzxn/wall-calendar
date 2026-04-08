"use client";

import { useState, useEffect, useCallback } from "react";

export interface NoteEntry {
  id: string;
  text: string;
  createdAt: string;
  rangeStart?: string;
  rangeEnd?: string;
  label?: string;
}

function storageKey(year: number, month: number) {
  return `wall-cal-notes-${year}-${String(month + 1).padStart(2, "0")}`;
}

export function useNotes(year: number, month: number) {
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [monthMemo, setMonthMemo] = useState("");

  // Load from localStorage whenever month/year changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(storageKey(year, month));
      if (raw) {
        const parsed = JSON.parse(raw) as { notes: NoteEntry[]; memo: string };
        setNotes(parsed.notes ?? []);
        setMonthMemo(parsed.memo ?? "");
      } else {
        setNotes([]);
        setMonthMemo("");
      }
    } catch {
      setNotes([]);
      setMonthMemo("");
    }
  }, [year, month]);

  const persist = useCallback(
    (updatedNotes: NoteEntry[], updatedMemo: string) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(
        storageKey(year, month),
        JSON.stringify({ notes: updatedNotes, memo: updatedMemo })
      );
    },
    [year, month]
  );

  const addNote = useCallback(
    (text: string, rangeStart?: string, rangeEnd?: string, label?: string) => {
      const entry: NoteEntry = {
        id: crypto.randomUUID(),
        text,
        createdAt: new Date().toISOString(),
        rangeStart,
        rangeEnd,
        label,
      };
      setNotes((prev) => {
        const updated = [...prev, entry];
        persist(updated, monthMemo);
        return updated;
      });
    },
    [monthMemo, persist]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        persist(updated, monthMemo);
        return updated;
      });
    },
    [monthMemo, persist]
  );

  const updateMemo = useCallback(
    (text: string) => {
      setMonthMemo(text);
      persist(notes, text);
    },
    [notes, persist]
  );

  return { notes, monthMemo, addNote, deleteNote, updateMemo };
}
