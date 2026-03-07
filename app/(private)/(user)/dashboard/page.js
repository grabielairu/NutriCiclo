"use client";

import ButtonAccount from "@/components/ButtonAccount";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import CycleWheel from "@/components/dashboard/CycleWheel";
import { useCycleData } from "@/hooks/useCycleData";
import { getCurrentCycleDay, getPhaseForDay, getNextPeriodDate, getDaysRemainingInPhase } from "@/libs/cycle";
import { PHASES } from "@/libs/constants";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const { cycleData, saveCycleData, isLoading } = useCycleData();

  const handleOnboardingComplete = (data) => {
    saveCycleData(data);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-nature-soft">
        <span className="loading loading-spinner loading-lg text-[var(--color-sage)]"></span>
      </main>
    );
  }

  if (!cycleData) {
    return (
      <main className="min-h-screen bg-nature-soft">
        <div className="p-4 flex justify-end max-w-7xl mx-auto">
          <ButtonAccount />
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <span className="text-6xl mb-4" style={{ animation: "float 6s ease-in-out infinite" }}>🦦</span>
          <h1 className="text-3xl font-bold text-[var(--color-dark)] mb-2">
            Bienvenida a NutriCiclo
          </h1>
          <p className="text-[var(--color-dark)]/60 mb-6">
            Necesitamos algunos datos para personalizar tus recomendaciones.
          </p>
        </div>
        <OnboardingModal isOpen={true} onComplete={handleOnboardingComplete} />
      </main>
    );
  }

  const day = getCurrentCycleDay(cycleData.lastPeriodStart, cycleData.cycleLength);
  const phase = getPhaseForDay(day, cycleData.cycleLength, cycleData.periodDuration);
  const phaseData = PHASES[phase.name];
  const nextPeriod = getNextPeriodDate(cycleData.lastPeriodStart, cycleData.cycleLength);
  const daysLeft = getDaysRemainingInPhase(day, cycleData.cycleLength, cycleData.periodDuration);

  return (
    <main className="min-h-screen bg-nature-soft">
      {/* Dashboard header with phase-tinted gradient */}
      <div
        className="border-b border-white/20"
        style={{
          background: `linear-gradient(135deg, ${phaseData.color}15 0%, transparent 100%)`,
        }}
      >
        <div className="p-5 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦦</span>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-dark)]">
                Hola, {cycleData.name}
              </h2>
              <p className="text-xs text-[var(--color-dark)]/50">
                {new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
          </div>
          <ButtonAccount />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: CycleWheel + Phase Info */}
          <div className="lg:w-2/5 flex flex-col items-center gap-6">
            {/* Wheel container with glass effect */}
            <div className="glass-strong rounded-3xl p-6 shadow-nature w-full flex justify-center">
              <CycleWheel
                currentDay={day}
                cycleLength={cycleData.cycleLength}
                periodDuration={cycleData.periodDuration}
                phaseName={phase.name}
              />
            </div>

            {/* Phase info card with left border accent */}
            <div
              className="glass rounded-2xl p-5 w-full shadow-nature"
              style={{
                borderLeft: `4px solid ${phaseData.color}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: phaseData.color }}
                >
                  Fase {phaseData.name}
                </span>
                <span className="text-xs text-[var(--color-dark)]/50">
                  {daysLeft === 0 ? "Ultimo dia" : `${daysLeft} dias restantes`}
                </span>
              </div>
              <p className="text-[var(--color-dark)]/70 text-sm leading-relaxed">
                {phaseData.description}
              </p>
              <div className="mt-3 pt-3 border-t border-[var(--color-dark)]/5">
                <p className="text-xs text-[var(--color-dark)]/50 flex items-center gap-1">
                  <span>📅</span>
                  Proximo periodo: <strong className="text-[var(--color-dark)]/70">{nextPeriod.toLocaleDateString("es-MX", { day: "numeric", month: "long" })}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Nutrition recommendations */}
          <div className="lg:w-3/5">
            <div
              className="glass-strong rounded-3xl p-8 shadow-nature"
              style={{ "--phase-color": phaseData.color + "30" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `linear-gradient(135deg, ${phaseData.color}, ${phaseData.color}cc)` }}
                >
                  🍎
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-dark)]">
                    Alimentos recomendados
                  </h3>
                  <p className="text-xs text-[var(--color-dark)]/50">
                    Para la fase {phaseData.name.toLowerCase()} de tu ciclo
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                {phaseData.foods.map((food, i) => (
                  <div key={i} className="food-item flex gap-4">
                    <div
                      className="w-1.5 rounded-full flex-shrink-0 mt-1 self-stretch"
                      style={{ backgroundColor: phaseData.color }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--color-dark)] text-[15px]">{food.name}</p>
                      <p className="text-sm text-[var(--color-dark)]/55 leading-relaxed mt-0.5">{food.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[var(--color-dark)]/30 text-center mt-6">
              Recomendaciones informativas basadas en ciencia nutricional. Consulta a tu profesional de salud.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
