"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getPhaseForDay, getCurrentCycleDay, getNextPeriodDate } from "@/libs/cycle";
import { PHASES } from "@/libs/constants";

const STEPS = 3;

export default function OnboardingModal({ isOpen, onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    age: "",
    cycleLength: 28,
    periodDuration: 5,
    lastPeriodStart: "",
  });

  const canAdvance = () => {
    if (step === 1) return form.name.trim() && form.age;
    if (step === 2) return true;
    if (step === 3) return form.lastPeriodStart;
    return false;
  };

  const handleNext = () => {
    if (step < STEPS) {
      setStep(step + 1);
    } else {
      onComplete({
        name: form.name.trim(),
        age: parseInt(form.age),
        cycleLength: form.cycleLength,
        periodDuration: form.periodDuration,
        lastPeriodStart: form.lastPeriodStart,
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Preview for step 3
  const getPreview = () => {
    if (!form.lastPeriodStart) return null;
    const day = getCurrentCycleDay(form.lastPeriodStart, form.cycleLength);
    const phase = getPhaseForDay(day, form.cycleLength, form.periodDuration);
    const phaseData = PHASES[phase.name];
    const nextPeriod = getNextPeriodDate(form.lastPeriodStart, form.cycleLength);
    return { day, phase, phaseData, nextPeriod };
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-3xl glass-strong p-5 sm:p-8 shadow-2xl transition-all">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className="w-3 h-3 rounded-full transition-colors"
                      style={{
                        backgroundColor: s <= step ? "var(--color-sage)" : "#d1d5db",
                      }}
                    />
                  ))}
                </div>

                {/* Step 1: Name + Age */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-4xl">🦦</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)] mt-2">
                        Hola! Cuéntanos de ti
                      </h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                        Tu nombre
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ej: Maria"
                        className="input input-bordered w-full bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                        Tu edad
                      </label>
                      <input
                        type="number"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                        placeholder="Ej: 28"
                        min="12"
                        max="60"
                        className="input input-bordered w-full bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Cycle length + Period duration */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-4xl">🌙</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)] mt-2">
                        Sobre tu ciclo
                      </h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                        Duracion de tu ciclo (dias)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        value={form.cycleLength}
                        onChange={(e) => setForm({ ...form, cycleLength: parseInt(e.target.value) })}
                        className="range"
                        style={{ accentColor: "var(--color-sage)" }}
                      />
                      <div className="flex justify-between text-xs text-[var(--color-dark)]/50 mt-1">
                        <span>0</span>
                        <span className="font-bold text-[var(--color-sage)] text-base">{form.cycleLength} dias</span>
                        <span>60</span>
                      </div>
                      <p className="text-xs text-[var(--color-dark)]/40 mt-1">
                        El promedio es 28 dias. Si no estas segura, dejalo en 28. Cada cuerpo es diferente.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                        Duracion de tu periodo (dias de sangrado)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={form.periodDuration}
                        onChange={(e) => setForm({ ...form, periodDuration: parseInt(e.target.value) })}
                        className="range"
                        style={{ accentColor: "var(--color-coral)" }}
                      />
                      <div className="flex justify-between text-xs text-[var(--color-dark)]/50 mt-1">
                        <span>0</span>
                        <span className="font-bold text-[var(--color-coral)] text-base">{form.periodDuration} dias</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Last period date + Preview */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-4xl">📅</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)] mt-2">
                        Ultimo periodo
                      </h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-1">
                        Fecha en que inicio tu ultimo periodo
                      </label>
                      <input
                        type="date"
                        value={form.lastPeriodStart}
                        onChange={(e) => setForm({ ...form, lastPeriodStart: e.target.value })}
                        max={new Date().toISOString().split("T")[0]}
                        className="input input-bordered w-full bg-white"
                      />
                    </div>

                    {/* Preview */}
                    {form.lastPeriodStart && (() => {
                      const preview = getPreview();
                      if (!preview) return null;
                      return (
                        <div
                          className="rounded-xl p-4 text-center space-y-2"
                          style={{ backgroundColor: preview.phaseData.color + "20" }}
                        >
                          <p className="text-sm text-[var(--color-dark)]/60">Hoy estas en:</p>
                          <p className="text-lg font-bold text-[var(--color-dark)]">
                            {preview.phaseData.emoji} Dia {preview.day} - Fase {preview.phaseData.name}
                          </p>
                          <p className="text-sm text-[var(--color-dark)]/60">
                            Proximo periodo: {preview.nextPeriod.toLocaleDateString("es-MX", { day: "numeric", month: "long" })}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="btn btn-ghost text-[var(--color-dark)]"
                    >
                      Atras
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!canAdvance()}
                    className={`btn border-none ${canAdvance() ? "btn-nature" : "text-white"}`}
                    style={canAdvance() ? {} : { backgroundColor: "#9ca3af" }}
                  >
                    {step === STEPS ? "Ir a mi Dashboard" : "Siguiente"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
