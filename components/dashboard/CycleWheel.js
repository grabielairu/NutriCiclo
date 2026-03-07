"use client";

import { calculatePhases } from "@/libs/cycle";
import { PHASES, PHASE_COLORS } from "@/libs/constants";

const SIZE = 380;
const CENTER = SIZE / 2;
const RADIUS = 120;
const STROKE_WIDTH = 30;

function dayToAngle(day, cycleLength) {
  return ((day - 1) / cycleLength) * 2 * Math.PI - Math.PI / 2;
}

function describeArc(startDay, endDay, cycleLength) {
  const startAngle = dayToAngle(startDay, cycleLength);
  const endAngle = dayToAngle(endDay + 1, cycleLength);

  const x1 = CENTER + RADIUS * Math.cos(startAngle);
  const y1 = CENTER + RADIUS * Math.sin(startAngle);
  const x2 = CENTER + RADIUS * Math.cos(endAngle);
  const y2 = CENTER + RADIUS * Math.sin(endAngle);

  const arcSpan = endAngle - startAngle;
  const largeArc = arcSpan > Math.PI ? 1 : 0;

  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export default function CycleWheel({ currentDay, cycleLength, periodDuration, phaseName }) {
  const phases = calculatePhases(cycleLength, periodDuration);
  const currentPhaseData = PHASES[phaseName];
  const phaseColor = currentPhaseData?.color || "#4A7C59";

  // Current day marker
  const markerAngle = dayToAngle(currentDay, cycleLength);
  const markerX = CENTER + RADIUS * Math.cos(markerAngle);
  const markerY = CENTER + RADIUS * Math.sin(markerAngle);

  // Phase labels positioned outside the donut
  const labelRadius = RADIUS + STROKE_WIDTH / 2 + 32;
  const phaseLabels = phases.map((phase) => {
    const midDay = (phase.startDay + phase.endDay) / 2;
    const angle = dayToAngle(midDay, cycleLength);
    return {
      x: CENTER + labelRadius * Math.cos(angle),
      y: CENTER + labelRadius * Math.sin(angle),
      name: PHASES[phase.name]?.name || phase.name,
      days: `Dias ${phase.startDay}-${phase.endDay}`,
      color: PHASE_COLORS[phase.name],
      key: phase.name,
    };
  });

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto max-w-[380px]">
        <defs>
          {/* Glow filter for active phase */}
          <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Pulse animation for marker */}
          <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle (subtle) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={STROKE_WIDTH}
          opacity="0.3"
        />

        {/* Phase arcs */}
        {phases.map((phase) => {
          const color = PHASE_COLORS[phase.name];
          const isActive = phase.name === phaseName;
          return (
            <path
              key={phase.name}
              d={describeArc(phase.startDay, phase.endDay, cycleLength)}
              fill="none"
              stroke={color}
              strokeWidth={isActive ? STROKE_WIDTH + 8 : STROKE_WIDTH}
              strokeLinecap="round"
              opacity={isActive ? 1 : 0.4}
              filter={isActive ? "url(#activeGlow)" : undefined}
            />
          );
        })}

        {/* Current day marker - outer ring */}
        <circle
          cx={markerX}
          cy={markerY}
          r={12}
          fill={phaseColor}
          opacity="0.2"
          filter="url(#markerGlow)"
        >
          <animate
            attributeName="r"
            values="12;16;12"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.1;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Current day marker - inner dot */}
        <circle
          cx={markerX}
          cy={markerY}
          r={8}
          fill="white"
          stroke={phaseColor}
          strokeWidth={3}
        />

        {/* Center content */}
        <text
          x={CENTER}
          y={CENTER - 16}
          textAnchor="middle"
          fill="var(--color-dark, #2D3B2D)"
          fontSize="40"
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
        >
          {currentDay}
        </text>
        <text
          x={CENTER}
          y={CENTER + 6}
          textAnchor="middle"
          fill="var(--color-dark, #2D3B2D)"
          fontSize="11"
          opacity="0.4"
          fontFamily="system-ui, sans-serif"
        >
          de {cycleLength} dias
        </text>
        <text
          x={CENTER}
          y={CENTER + 28}
          textAnchor="middle"
          fill={phaseColor}
          fontSize="14"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          Fase {currentPhaseData?.name}
        </text>

        {/* Phase labels outside the donut */}
        {phaseLabels.map((label) => (
          <g key={label.key}>
            <text
              x={label.x}
              y={label.y - 6}
              textAnchor="middle"
              dominantBaseline="central"
              fill={label.color}
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              {label.name}
            </text>
            <text
              x={label.x}
              y={label.y + 8}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-dark, #2D3B2D)"
              fontSize="9"
              opacity="0.4"
              fontFamily="system-ui, sans-serif"
            >
              {label.days}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
