"use client";

import { calculatePhases } from "@/libs/cycle";
import { PHASE_COLORS } from "@/libs/constants";

const WIDTH = 600;
const HEIGHT = 160;
const PADDING = { top: 20, right: 15, bottom: 30, left: 15 };
const CHART_W = WIDTH - PADDING.left - PADDING.right;
const CHART_H = HEIGHT - PADDING.top - PADDING.bottom;

function getEstrogen(t) {
  // t = 0..1 (normalized cycle position)
  // Estrogen: low in menstrual, rises in follicular, peaks at ovulation (~0.5), moderate rise in luteal, drops at end
  if (t < 0.15) return 0.15 + 0.1 * Math.sin(t * Math.PI / 0.15);
  if (t < 0.5) return 0.25 + 0.75 * Math.pow(Math.sin((t - 0.15) * Math.PI / 0.7), 1.2);
  if (t < 0.6) return 0.3 + 0.3 * Math.sin((t - 0.5) * Math.PI / 0.1);
  if (t < 0.85) return 0.3 + 0.35 * Math.sin((t - 0.6) * Math.PI / 0.5);
  return 0.3 * Math.max(0, 1 - (t - 0.85) / 0.15);
}

function getProgesterone(t) {
  // Progesterone: minimal until ovulation, rises sharply in luteal, peaks ~0.75, drops at end
  if (t < 0.45) return 0.05 + 0.05 * Math.sin(t * Math.PI * 2);
  if (t < 0.55) return 0.05 + 0.6 * Math.pow((t - 0.45) / 0.1, 1.5);
  if (t < 0.8) return 0.65 + 0.35 * Math.sin((t - 0.55) * Math.PI / 0.5);
  return Math.max(0.05, 1.0 * Math.pow(1 - (t - 0.8) / 0.2, 2));
}

function generateCurve(fn, steps = 80) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = PADDING.left + t * CHART_W;
    const y = PADDING.top + CHART_H * (1 - fn(t));
    points.push({ x, y });
  }
  return points;
}

function pointsToLine(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

function pointsToArea(points) {
  const line = pointsToLine(points);
  const lastX = points[points.length - 1].x;
  const firstX = points[0].x;
  const bottom = PADDING.top + CHART_H;
  return `${line} L ${lastX.toFixed(1)} ${bottom} L ${firstX.toFixed(1)} ${bottom} Z`;
}

export default function HormoneChart({ currentDay, cycleLength, periodDuration, ovulationDay = null }) {
  const phases = calculatePhases(cycleLength, periodDuration, ovulationDay);
  const estrogenPoints = generateCurve(getEstrogen);
  const progesteronePoints = generateCurve(getProgesterone);

  const dayPosition = PADDING.left + ((currentDay - 1) / Math.max(cycleLength - 1, 1)) * CHART_W;

  const phaseColors = {
    menstrual: PHASE_COLORS.menstrual + "15",
    folicular: PHASE_COLORS.folicular + "15",
    ovulatoria: PHASE_COLORS.ovulatoria + "15",
    lutea: PHASE_COLORS.lutea + "15",
  };

  return (
    <div className="glass-strong rounded-3xl p-4 sm:p-6 shadow-nature w-full">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-lg">📊</span>
        <div>
          <h3 className="text-base font-bold text-[var(--color-dark)]">Tus hormonas hoy</h3>
          <p className="text-xs text-[var(--color-dark)]/50">Niveles aproximados a lo largo de tu ciclo</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-2 ml-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "#E07A9A" }} />
          <span className="text-xs text-[var(--color-dark)]/60">Estrógeno</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "#D4A054" }} />
          <span className="text-xs text-[var(--color-dark)]/60">Progesterona</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Phase background bands */}
        {phases.map((phase) => {
          const x1 = PADDING.left + ((phase.startDay - 1) / cycleLength) * CHART_W;
          const x2 = PADDING.left + (phase.endDay / cycleLength) * CHART_W;
          return (
            <rect
              key={phase.name}
              x={x1}
              y={PADDING.top}
              width={Math.max(x2 - x1, 0)}
              height={CHART_H}
              fill={phaseColors[phase.name]}
              rx={2}
            />
          );
        })}

        {/* Estrogen area + line */}
        <path d={pointsToArea(estrogenPoints)} fill="#E07A9A" opacity={0.12} />
        <path d={pointsToLine(estrogenPoints)} fill="none" stroke="#E07A9A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Progesterone area + line */}
        <path d={pointsToArea(progesteronePoints)} fill="#D4A054" opacity={0.12} />
        <path d={pointsToLine(progesteronePoints)} fill="none" stroke="#D4A054" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Today marker */}
        <line
          x1={dayPosition} y1={PADDING.top - 5}
          x2={dayPosition} y2={PADDING.top + CHART_H + 5}
          stroke="var(--color-dark, #2D3B2D)" strokeWidth={2} strokeDasharray="4 3" opacity={0.4}
        />
        <circle cx={dayPosition} cy={PADDING.top - 5} r={4} fill="var(--color-dark, #2D3B2D)" opacity={0.6}>
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <text
          x={dayPosition} y={PADDING.top - 12}
          textAnchor="middle" fontSize="9" fontWeight="700"
          fill="var(--color-dark, #2D3B2D)" opacity={0.7}
          fontFamily="system-ui, sans-serif"
        >
          Hoy
        </text>

        {/* Phase labels on X axis */}
        {phases.map((phase) => {
          const midDay = (phase.startDay + phase.endDay) / 2;
          const x = PADDING.left + ((midDay - 0.5) / cycleLength) * CHART_W;
          const phaseNames = { menstrual: "Menstrual", folicular: "Folicular", ovulatoria: "Ovulatoria", lutea: "Lutea" };
          return (
            <text
              key={phase.name}
              x={x} y={HEIGHT - 8}
              textAnchor="middle" fontSize="9" fontWeight="600"
              fill={PHASE_COLORS[phase.name]}
              fontFamily="system-ui, sans-serif"
            >
              {phaseNames[phase.name]}
            </text>
          );
        })}
      </svg>

      <p className="text-[10px] text-[var(--color-dark)]/30 text-center mt-1">
        Representación educativa aproximada. Los niveles reales varían en cada persona.
      </p>
    </div>
  );
}
