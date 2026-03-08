"use client";

import { useState } from "react";
import ButtonAccount from "@/components/ButtonAccount";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import CycleWheel from "@/components/dashboard/CycleWheel";
import CycleDataEditor from "@/components/dashboard/CycleDataEditor";
import DailyTip from "@/components/dashboard/DailyTip";
import HormoneChart from "@/components/dashboard/HormoneChart";
import RegionSelector from "@/components/dashboard/RegionSelector";
import DietSelector from "@/components/dashboard/DietSelector";
import { useCycleData } from "@/hooks/useCycleData";
import { getCurrentCycleDay, getPhaseForDay, getNextPeriodDate, getDaysRemainingInPhase } from "@/libs/cycle";
import { PHASES } from "@/libs/constants";
import { getFoodsForPhase, REGIONS } from "@/libs/regionalFoods";
import { getFoodsForDiet, DIET_TYPES } from "@/libs/dietFoods";
import { generateCyclePDF, openWhatsAppShare } from "@/libs/exportPdf";
import { getTipForDay } from "@/libs/dailyTips";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const { cycleData, saveCycleData, saveRegion, saveDietType, isLoading } = useCycleData();
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);

  const handleOnboardingComplete = (data) => {
    saveCycleData(data);
  };

  const handleRegionSelect = (region) => {
    saveRegion(region);
  };

  const handleDietSelect = (dietType) => {
    saveDietType(dietType);
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
        <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-8 text-center">
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
  const phase = getPhaseForDay(day, cycleData.cycleLength, cycleData.periodDuration, cycleData.ovulationDay);
  const phaseData = PHASES[phase.name];
  const nextPeriod = getNextPeriodDate(cycleData.lastPeriodStart, cycleData.cycleLength);
  const daysLeft = getDaysRemainingInPhase(day, cycleData.cycleLength, cycleData.periodDuration, cycleData.ovulationDay);

  const dietFoods = getFoodsForDiet(phase.name, cycleData.dietType);
  const regionFoods = getFoodsForPhase(phase.name, cycleData.region);
  const foods = dietFoods || regionFoods || phaseData.foods;
  const currentRegion = REGIONS.find((r) => r.key === cycleData.region) || REGIONS[0];
  const currentDiet = DIET_TYPES.find((d) => d.key === cycleData.dietType) || DIET_TYPES[0];

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: CycleWheel + Phase Info */}
          <div className="lg:w-2/5 flex flex-col items-center gap-6">
            {/* Wheel container with glass effect */}
            <div className="glass-strong rounded-3xl p-3 sm:p-6 shadow-nature w-full flex justify-center">
              <CycleWheel
                currentDay={day}
                cycleLength={cycleData.cycleLength}
                periodDuration={cycleData.periodDuration}
                phaseName={phase.name}
                ovulationDay={cycleData.ovulationDay}
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
                  {daysLeft === 0 ? "Último día" : `${daysLeft} días restantes`}
                </span>
              </div>
              <p className="text-[var(--color-dark)]/70 text-sm leading-relaxed">
                {phaseData.description}
              </p>
              <div className="mt-3 pt-3 border-t border-[var(--color-dark)]/5">
                <p className="text-xs text-[var(--color-dark)]/50 flex items-center gap-1">
                  <span>📅</span>
                  Próximo periodo: <strong className="text-[var(--color-dark)]/70">{nextPeriod.toLocaleDateString("es-MX", { day: "numeric", month: "long" })}</strong>
                </p>
              </div>
            </div>

            {/* Tip del dia */}
            <DailyTip
              phaseName={phase.name}
              dayInPhase={day - phase.startDay}
              phaseColor={phaseData.color}
            />

            {/* Alerta profesional para ciclos fuera del rango normal */}
            {(() => {
              const alerts = [];
              if (cycleData.periodDuration >= cycleData.cycleLength && cycleData.cycleLength > 0)
                alerts.push("Si tu sangrado dura todo el ciclo, es buena idea platicarlo con tu profesional de salud para entender mejor qué pasa en tu cuerpo.");
              if (cycleData.cycleLength < 21 && cycleData.cycleLength > 0)
                alerts.push("Un ciclo menor a 21 días es menos común. Vale la pena comentarlo con tu profesional de salud para conocer mejor tu cuerpo.");
              if (cycleData.cycleLength > 35)
                alerts.push("Un ciclo mayor a 35 días puede tener varias causas. Es buena idea mencionarlo en tu próxima consulta para asegurarte de que todo esté bien.");
              if (cycleData.periodDuration > 7)
                alerts.push("Un sangrado de más de 7 días merece una revisión profesional para asegurarte de que todo está bien.");
              if (cycleData.periodDuration < 2 && cycleData.periodDuration > 0)
                alerts.push("Un sangrado menor a 2 días es poco común. Mencionarlo en tu próxima consulta puede ayudarte a entender mejor tu ciclo.");

              if (alerts.length === 0) return null;

              return (
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-4 w-full shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
                    <div className="space-y-2">
                      <h4 className="font-bold text-amber-900 text-sm">Un recordatorio importante</h4>
                      {alerts.map((msg, i) => (
                        <p key={i} className="text-amber-800 text-sm leading-relaxed">{msg}</p>
                      ))}
                      <p className="text-amber-700/60 text-xs mt-2 pt-2 border-t border-amber-200">
                        Esta app no reemplaza el consejo médico profesional. Siempre consulta con un especialista.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Editor de datos del ciclo */}
            <CycleDataEditor
              cycleData={cycleData}
              onSave={(updated) => saveCycleData({ ...cycleData, ...updated })}
            />
          </div>

          {/* Right: Nutrition recommendations */}
          <div className="lg:w-3/5">
            <div
              className="glass-strong rounded-3xl p-4 sm:p-6 md:p-8 shadow-nature"
              style={{ "--phase-color": phaseData.color + "30" }}
            >
              <div className="flex items-center gap-3 mb-2">
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

              {/* Region selector + Share buttons */}
              <div className="flex gap-2 flex-wrap mb-5">
                <button
                  onClick={() => setShowRegionModal(true)}
                  className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-full bg-[var(--color-sage)]/15 border-2 border-[var(--color-sage)]/40 hover:bg-[var(--color-sage)]/25 hover:border-[var(--color-sage)]/60 transition-colors font-medium"
                >
                  <span>{currentRegion.emoji}</span>
                  <span className="text-[var(--color-dark)]/70">
                    {!cycleData.region || cycleData.region === "general"
                      ? "Personaliza por región"
                      : `Región: ${currentRegion.label}`}
                  </span>
                  <span className="text-[var(--color-sage)]">&#x25B8;</span>
                </button>
                <button
                  onClick={() => setShowDietModal(true)}
                  className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-full bg-[var(--color-sage)]/15 border-2 border-[var(--color-sage)]/40 hover:bg-[var(--color-sage)]/25 hover:border-[var(--color-sage)]/60 transition-colors font-medium"
                >
                  <span>{currentDiet.emoji}</span>
                  <span className="text-[var(--color-dark)]/70">
                    {!cycleData.dietType || cycleData.dietType === "general"
                      ? "Tipo de dieta"
                      : currentDiet.label}
                  </span>
                  <span className="text-[var(--color-sage)]">&#x25B8;</span>
                </button>
                <button
                  onClick={() => {
                    const tip = getTipForDay(phase.name, day - phase.startDay);
                    const alertsList = [];
                    if (cycleData.periodDuration >= cycleData.cycleLength && cycleData.cycleLength > 0)
                      alertsList.push("Si tu sangrado dura todo el ciclo, platicalo con tu profesional de salud.");
                    if (cycleData.cycleLength < 21 && cycleData.cycleLength > 0)
                      alertsList.push("Un ciclo menor a 21 días es menos común. Vale la pena comentarlo con tu profesional.");
                    if (cycleData.cycleLength > 35)
                      alertsList.push("Un ciclo mayor a 35 días puede tener varias causas. Menciónalo en tu próxima consulta.");
                    if (cycleData.periodDuration > 7)
                      alertsList.push("Un sangrado de más de 7 días merece una revisión profesional.");

                    generateCyclePDF({
                      name: cycleData.name,
                      cycleLength: cycleData.cycleLength,
                      periodDuration: cycleData.periodDuration,
                      currentDay: day,
                      phaseName: phase.name,
                      phaseData,
                      daysLeft,
                      nextPeriod,
                      foods,
                      tip,
                      alerts: alertsList,
                      regionLabel: currentRegion.label,
                      dietLabel: currentDiet.label,
                      ovulationDay: cycleData.ovulationDay,
                    });

                    setTimeout(() => {
                      openWhatsAppShare({
                        phaseName: phaseData.name,
                        currentDay: day,
                        cycleLength: cycleData.cycleLength,
                      });
                    }, 500);
                  }}
                  className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-full bg-[var(--color-coral)]/15 border-2 border-[var(--color-coral)]/40 hover:bg-[var(--color-coral)]/25 hover:border-[var(--color-coral)]/60 transition-colors font-medium"
                >
                  <span>&#x1F4C4;</span>
                  <span className="text-[var(--color-dark)]/70">Compartir resumen</span>
                </button>
              </div>

              <div className="space-y-1">
                {foods.map((food, i) => (
                  <div key={i} className="food-item flex gap-4">
                    <div
                      className="w-1.5 rounded-full flex-shrink-0 mt-1 self-stretch"
                      style={{ backgroundColor: phaseData.color }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--color-dark)] text-sm sm:text-[15px]">{food.name}</p>
                      <p className="text-sm text-[var(--color-dark)]/55 leading-relaxed mt-0.5">{food.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[var(--color-dark)]/30 text-center mt-6 mb-6">
              Recomendaciones informativas basadas en ciencia nutricional. Consulta a tu profesional de salud.
            </p>

            {/* Grafica hormonal */}
            <HormoneChart
              currentDay={day}
              cycleLength={cycleData.cycleLength}
              periodDuration={cycleData.periodDuration}
              ovulationDay={cycleData.ovulationDay}
            />
          </div>
        </div>
      </div>

      {/* Region selector modal */}
      <RegionSelector
        isOpen={showRegionModal}
        onClose={() => setShowRegionModal(false)}
        currentRegion={cycleData.region || "general"}
        onSelect={handleRegionSelect}
      />

      {/* Diet selector modal */}
      <DietSelector
        isOpen={showDietModal}
        onClose={() => setShowDietModal(false)}
        currentDietType={cycleData.dietType || "general"}
        onSelect={handleDietSelect}
      />
    </main>
  );
}
