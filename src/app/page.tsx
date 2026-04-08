"use client";

import { MONTH_THEMES } from "@/lib/monthThemes";
import { useCalendar } from "@/hooks/useCalendar";
import WallCalendar from "@/components/WallCalendar";
import NotesPanel from "@/components/NotesPanel";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./page.module.css";

export default function Home() {
  const cal = useCalendar();

  return (
    <div className={styles.pageRoot}>
      {/* Top bar */}
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>▦</div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>wall calendar</div>
            <div className={styles.brandSub}>interactive date planner</div>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Two-column layout */}
      <main className={styles.content}>
        <div className={styles.calendarCol}>
          <WallCalendar
            viewMonth={cal.viewMonth}
            viewYear={cal.viewYear}
            selection={cal.selection}
            hoverDate={cal.hoverDate}
            daysInMonth={cal.getDaysInMonth(cal.viewYear, cal.viewMonth)}
            firstDayOfWeek={cal.getFirstDayOfWeek(cal.viewYear, cal.viewMonth)}
            selectedDaysCount={cal.selectedDaysCount()}
            daysUntilMonthEnd={cal.daysUntilMonthEnd()}
            isToday={cal.isToday}
            isStart={cal.isStart}
            isEnd={cal.isEnd}
            isInRange={cal.isInRange}
            onPrev={cal.goToPreviousMonth}
            onNext={cal.goToNextMonth}
            onDayClick={cal.handleDayClick}
            onHoverDay={cal.setHoverDate}
            onClear={cal.clearSelection}
          />
        </div>
        <div className={styles.notesCol}>
          <NotesPanel
            month={cal.viewMonth}
            year={cal.viewYear}
            selection={cal.selection}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.hint}>
        <span className={styles.hintChip}>click → <strong>start</strong></span>
        <span className={styles.hintChip}>click again → <strong>end</strong></span>
        <span className={styles.hintChip}>hover to preview range</span>
        <span className={styles.hintChip}>notes auto-saved</span>
      </footer>
    </div>
  );
}
