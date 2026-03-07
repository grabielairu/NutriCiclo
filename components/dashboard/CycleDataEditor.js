"use client";

import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "react-day-picker/style.css";

export default function CycleDataEditor({ cycleData, onSave }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [useCustomOvulation, setUseCustomOvulation] = useState(false);

  useEffect(() => {
    setForm({
      lastPeriodStart: cycleData.lastPeriodStart || "",
      lastPeriodEnd: cycleData.lastPeriodEnd || "",
      cycleLength: cycleData.cycleLength ?? 28,
      periodDuration: cycleData.periodDuration ?? 5,
      ovulationDay: cycleData.ovulationDay || null,
    });
    setUseCustomOvulation(!!cycleData.ovulationDay);
  }, [cycleData]);

  const hasChanges =
    form.lastPeriodStart !== (cycleData.lastPeriodStart || "") ||
    form.lastPeriodEnd !== (cycleData.lastPeriodEnd || "") ||
    form.cycleLength !== (cycleData.cycleLength ?? 28) ||
    form.periodDuration !== (cycleData.periodDuration ?? 5) ||
    form.ovulationDay !== (cycleData.ovulationDay || null);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        lastPeriodStart: form.lastPeriodStart,
        lastPeriodEnd: form.lastPeriodEnd || null,
        cycleLength: form.cycleLength,
        periodDuration: form.periodDuration,
        ovulationDay: useCustomOvulation ? form.ovulationDay : null,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCycleLengthChange = (val) => {
    const newCycle = parseInt(val);
    const newPeriod = Math.min(form.periodDuration, newCycle);
    const updates = { cycleLength: newCycle, periodDuration: newPeriod };
    if (useCustomOvulation && form.ovulationDay) {
      updates.ovulationDay = Math.min(form.ovulationDay, newCycle - 1);
    }
    setForm({ ...form, ...updates });
  };

  const autoOvulationDay = Math.max(form.cycleLength - 14, (form.periodDuration || 0) + 3);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedStart = form.lastPeriodStart ? new Date(form.lastPeriodStart + "T00:00:00") : undefined;
  const selectedEnd = form.lastPeriodEnd ? new Date(form.lastPeriodEnd + "T00:00:00") : undefined;

  return (
    <Disclosure as="div" className="w-full">
      <DisclosureButton className="glass rounded-2xl p-4 w-full flex items-center justify-between hover:bg-white/40 transition-colors group">
        <div className="flex items-center gap-2">
          <span className="text-lg">&#x1F4DD;</span>
          <span className="font-semibold text-sm text-[var(--color-dark)]">Mis datos de ciclo</span>
        </div>
        <svg
          className="w-4 h-4 text-[var(--color-dark)]/40 transition-transform group-data-[open]:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </DisclosureButton>

      <DisclosurePanel className="glass rounded-2xl p-5 mt-2 w-full space-y-6 shadow-nature">
        {/* A) Fechas de periodo */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
            Inicio del ultimo periodo
          </label>
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              locale={es}
              selected={selectedStart}
              onSelect={(date) => {
                if (!date) return;
                const iso = date.toLocaleDateString("en-CA");
                const updates = { lastPeriodStart: iso };
                if (form.lastPeriodEnd && iso > form.lastPeriodEnd) {
                  updates.lastPeriodEnd = "";
                }
                setForm({ ...form, ...updates });
              }}
              disabled={{ after: today }}
              style={{ "--rdp-accent-color": "var(--color-coral, #C97B6B)" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
            Fin del ultimo periodo
            <span className="font-normal text-[var(--color-dark)]/40 ml-1">(opcional)</span>
          </label>
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              locale={es}
              selected={selectedEnd}
              onSelect={(date) => {
                if (!date) return;
                setForm({ ...form, lastPeriodEnd: date.toLocaleDateString("en-CA") });
              }}
              disabled={[
                { after: today },
                ...(selectedStart ? [{ before: selectedStart }] : []),
              ]}
              style={{ "--rdp-accent-color": "var(--color-coral, #C97B6B)" }}
            />
          </div>
        </div>

        {/* B) Sliders de ciclo y sangrado */}
        <div className="border-t border-[var(--color-dark)]/5 pt-4">
          <label className="block text-sm font-semibold text-[var(--color-dark)] mb-1">
            Duracion del ciclo (dias)
          </label>
          <input
            type="range"
            min="0"
            max="60"
            value={form.cycleLength}
            onChange={(e) => handleCycleLengthChange(e.target.value)}
            className="range w-full"
            style={{ accentColor: "var(--color-sage)" }}
          />
          <div className="flex justify-between text-xs text-[var(--color-dark)]/50 mt-1">
            <span>0</span>
            <span className="font-bold text-[var(--color-sage)] text-base">{form.cycleLength} dias</span>
            <span>60</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-dark)] mb-1">
            Duracion del sangrado (dias)
          </label>
          <input
            type="range"
            min="0"
            max={Math.min(30, form.cycleLength)}
            value={form.periodDuration}
            onChange={(e) => setForm({ ...form, periodDuration: parseInt(e.target.value) })}
            className="range w-full"
            style={{ accentColor: "var(--color-coral)" }}
          />
          <div className="flex justify-between text-xs text-[var(--color-dark)]/50 mt-1">
            <span>0</span>
            <span className="font-bold text-[var(--color-coral)] text-base">{form.periodDuration} dias</span>
            <span>{Math.min(30, form.cycleLength)}</span>
          </div>
        </div>

        {/* C) Dia de ovulacion */}
        <div className="border-t border-[var(--color-dark)]/5 pt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[var(--color-dark)]">
              Dia de ovulacion personalizado
            </label>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              style={{ "--tglbg": "var(--color-sage)", borderColor: "var(--color-sage)" }}
              checked={useCustomOvulation}
              onChange={(e) => {
                setUseCustomOvulation(e.target.checked);
                if (!e.target.checked) {
                  setForm({ ...form, ovulationDay: null });
                } else {
                  setForm({ ...form, ovulationDay: autoOvulationDay });
                }
              }}
            />
          </div>

          {useCustomOvulation ? (
            <div>
              <input
                type="range"
                min={Math.max(form.periodDuration + 2, 1)}
                max={Math.max(form.cycleLength - 1, 1)}
                value={form.ovulationDay || autoOvulationDay}
                onChange={(e) => setForm({ ...form, ovulationDay: parseInt(e.target.value) })}
                className="range w-full"
                style={{ accentColor: "var(--color-sage)" }}
              />
              <div className="flex justify-between text-xs text-[var(--color-dark)]/50 mt-1">
                <span>Dia {Math.max(form.periodDuration + 2, 1)}</span>
                <span className="font-bold text-[var(--color-sage)] text-base">
                  Dia {form.ovulationDay || autoOvulationDay}
                </span>
                <span>Dia {Math.max(form.cycleLength - 1, 1)}</span>
              </div>
              <p className="text-xs text-[var(--color-dark)]/40 mt-1">
                Si usas pruebas de ovulacion o temperatura basal, indica el dia exacto.
              </p>
            </div>
          ) : (
            <p className="text-xs text-[var(--color-dark)]/40">
              Se calcula automaticamente (dia {autoOvulationDay} de tu ciclo)
            </p>
          )}
        </div>

        {/* D) Boton guardar */}
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`btn w-full border-none ${hasChanges && !saving ? "btn-nature" : "text-white"}`}
          style={hasChanges && !saving ? {} : { backgroundColor: "#9ca3af" }}
        >
          {saving ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Guardar cambios"
          )}
        </button>
      </DisclosurePanel>
    </Disclosure>
  );
}
