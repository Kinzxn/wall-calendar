"use client";

import { useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { DateSelection } from "@/hooks/useCalendar";
import { MONTH_THEMES } from "@/lib/monthThemes";
import styles from "./NotesPanel.module.css";

interface Props {
  month: number;
  year: number;
  selection: DateSelection;
}

type Tab = "memo" | "notes";
const MAX_MEMO = 500;

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotesPanel({ month, year, selection }: Props) {
  const { notes, monthMemo, addNote, deleteNote, updateMemo } = useNotes(year, month);
  const [activeTab, setActiveTab] = useState<Tab>("memo");
  const [noteText, setNoteText] = useState("");
  const [noteLabel, setNoteLabel] = useState("");
  const theme = MONTH_THEMES[month];

  const handleAdd = () => {
    if (!noteText.trim()) return;
    addNote(
      noteText.trim(),
      selection.start?.toISOString(),
      selection.end?.toISOString(),
      noteLabel.trim() || undefined
    );
    setNoteText("");
    setNoteLabel("");
  };

  const selectionText =
    selection.start && selection.end
      ? `${fmt(selection.start)} → ${fmt(selection.end)}`
      : selection.start
      ? `from ${fmt(selection.start)}`
      : null;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.title}>Notes</div>
        <div className={styles.tabs} role="tablist">
          <button
            id="tab-memo"
            className={`${styles.tab}${activeTab === "memo" ? " " + styles.tabActive : ""}`}
            onClick={() => setActiveTab("memo")}
            role="tab"
            aria-selected={activeTab === "memo"}
          >
            Monthly Memo
          </button>
          <button
            id="tab-notes"
            className={`${styles.tab}${activeTab === "notes" ? " " + styles.tabActive : ""}`}
            onClick={() => setActiveTab("notes")}
            role="tab"
            aria-selected={activeTab === "notes"}
          >
            Range Notes{notes.length > 0 ? ` (${notes.length})` : ""}
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {/* ── Memo Tab ── */}
        {activeTab === "memo" && (
          <div id="panel-memo" role="tabpanel" className={styles.memoWrap}>
            <label className={styles.memoLabel} htmlFor="monthly-memo">
              {theme.name} {year}
            </label>
            <textarea
              id="monthly-memo"
              className={styles.memoTextarea}
              value={monthMemo}
              onChange={(e) => updateMemo(e.target.value.slice(0, MAX_MEMO))}
              placeholder="Monthly goals, reminders, highlights…"
            />
            <div className={styles.charCount}>{monthMemo.length} / {MAX_MEMO}</div>
          </div>
        )}

        {/* ── Range Notes Tab ── */}
        {activeTab === "notes" && (
          <div id="panel-notes" role="tabpanel">
            {selectionText ? (
              <div className={styles.addNoteForm}>
                <div className={styles.rangeInfo}>
                  <span className={styles.rangeInfoDot} />
                  {selectionText}
                </div>
                <textarea
                  className={styles.noteInput}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Note for this range…"
                />
                <div className={styles.noteActions}>
                  <input
                    type="text"
                    className={styles.labelInput}
                    value={noteLabel}
                    onChange={(e) => setNoteLabel(e.target.value)}
                    placeholder="Label (optional)"
                    maxLength={40}
                  />
                  <button
                    className={styles.addBtn}
                    onClick={handleAdd}
                    disabled={!noteText.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.noRange}>
                Select a <strong>start</strong> and <strong>end</strong> date to attach a note.
              </p>
            )}

            <div className={styles.noteList} role="list">
              {notes.length === 0 ? (
                <div className={styles.emptyState}>no notes for {theme.name.toLowerCase()}</div>
              ) : (
                [...notes].reverse().map((note) => {
                  const start = note.rangeStart ? new Date(note.rangeStart) : null;
                  const end   = note.rangeEnd   ? new Date(note.rangeEnd)   : null;
                  const rangeStr = start && end ? `${fmt(start)} → ${fmt(end)}` : start ? fmt(start) : "";
                  return (
                    <div key={note.id} className={styles.noteCard} role="listitem">
                      <div className={styles.noteCardHeader}>
                        <div className={styles.noteMeta}>
                          {note.label && <div className={styles.noteLabel}>{note.label}</div>}
                          {rangeStr && <div className={styles.noteDateRange}>{rangeStr}</div>}
                        </div>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deleteNote(note.id)}
                          aria-label="Delete note"
                        >
                          ×
                        </button>
                      </div>
                      <p className={styles.noteText}>{note.text}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
