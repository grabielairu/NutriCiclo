"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "nutricilo_cycle_data";

/**
 * Hook para leer/guardar datos del ciclo menstrual.
 * Usa localStorage como almacenamiento.
 * Retorna { cycleData, saveCycleData, clearCycleData, isLoading }
 *
 * cycleData shape:
 * {
 *   name: string,
 *   age: number,
 *   cycleLength: number,      // 21-35, default 28
 *   periodDuration: number,   // 2-8, default 5
 *   lastPeriodStart: string,  // ISO date string "YYYY-MM-DD"
 * }
 */
export function useCycleData() {
  const [cycleData, setCycleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCycleData(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading cycle data:", e);
    }
    setIsLoading(false);
  }, []);

  const saveCycleData = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setCycleData(data);
    } catch (e) {
      console.error("Error saving cycle data:", e);
    }
  };

  const clearCycleData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setCycleData(null);
    } catch (e) {
      console.error("Error clearing cycle data:", e);
    }
  };

  return { cycleData, saveCycleData, clearCycleData, isLoading };
}
