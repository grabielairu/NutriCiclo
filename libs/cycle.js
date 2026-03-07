const LUTEAL_LENGTH = 14;

/**
 * Calcula los rangos de dias para cada fase del ciclo.
 * Principio medico: la fase lutea es fija (~14 dias), la folicular varia.
 */
export function calculatePhases(cycleLength = 28, periodDuration = 5) {
  const safeCycle = Math.max(cycleLength, 1);
  const safePeriod = Math.min(periodDuration, safeCycle);
  const ovulationDay = Math.max(safeCycle - LUTEAL_LENGTH, safePeriod + 3);

  return [
    {
      name: "menstrual",
      startDay: 1,
      endDay: safePeriod,
    },
    {
      name: "folicular",
      startDay: Math.min(safePeriod + 1, safeCycle),
      endDay: Math.max(ovulationDay - 2, safePeriod + 1),
    },
    {
      name: "ovulatoria",
      startDay: Math.max(ovulationDay - 1, safePeriod + 2),
      endDay: Math.min(ovulationDay + 1, safeCycle),
    },
    {
      name: "lutea",
      startDay: Math.min(ovulationDay + 2, safeCycle),
      endDay: safeCycle,
    },
  ];
}

/**
 * Calcula el dia actual del ciclo (1-indexed, con wrap-around para ciclos pasados).
 */
export function getCurrentCycleDay(lastPeriodStart, cycleLength = 28) {
  const start = new Date(lastPeriodStart);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;
}

/**
 * Retorna la fase correspondiente a un dia dado del ciclo.
 */
export function getPhaseForDay(day, cycleLength = 28, periodDuration = 5) {
  const phases = calculatePhases(cycleLength, periodDuration);
  return phases.find((p) => day >= p.startDay && day <= p.endDay) || phases[3];
}

/**
 * Calcula la fecha del proximo periodo.
 */
export function getNextPeriodDate(lastPeriodStart, cycleLength = 28) {
  const start = new Date(lastPeriodStart);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const next = new Date(start);
  while (next <= today) {
    next.setDate(next.getDate() + cycleLength);
  }
  return next;
}

/**
 * Calcula cuantos dias faltan para que termine la fase actual.
 */
export function getDaysRemainingInPhase(day, cycleLength = 28, periodDuration = 5) {
  const phase = getPhaseForDay(day, cycleLength, periodDuration);
  return phase.endDay - day;
}
