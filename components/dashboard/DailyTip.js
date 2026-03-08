"use client";

import { getTipForDay } from "@/libs/dailyTips";

export default function DailyTip({ phaseName, dayInPhase, phaseColor }) {
  const { icon, tip } = getTipForDay(phaseName, dayInPhase);

  return (
    <div
      className="glass rounded-2xl p-4 w-full shadow-nature"
      style={{ borderLeft: `4px solid ${phaseColor}` }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div>
          <p className="text-xs font-bold text-[var(--color-dark)]/40 uppercase tracking-wide mb-1">
            Tip del día
          </p>
          <p className="text-sm text-[var(--color-dark)]/80 leading-relaxed">
            {tip}
          </p>
        </div>
      </div>
    </div>
  );
}
