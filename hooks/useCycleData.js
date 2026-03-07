"use client";

import { useState, useEffect } from "react";

export function useCycleData() {
  const [cycleData, setCycleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cycle")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching cycle data");
        return res.json();
      })
      .then(({ data }) => {
        if (data) setCycleData(data);
      })
      .catch((e) => console.error("Error loading cycle data:", e))
      .finally(() => setIsLoading(false));
  }, []);

  const saveCycleData = async (data) => {
    try {
      const res = await fetch("/api/cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error saving cycle data");
      const { data: saved } = await res.json();
      setCycleData(saved);
    } catch (e) {
      console.error("Error saving cycle data:", e);
    }
  };

  const saveRegion = async (region) => {
    try {
      const res = await fetch("/api/cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cycleData, region }),
      });
      if (!res.ok) throw new Error("Error saving region");
      const { data: saved } = await res.json();
      setCycleData(saved);
    } catch (e) {
      console.error("Error saving region:", e);
    }
  };

  const clearCycleData = () => {
    setCycleData(null);
  };

  return { cycleData, saveCycleData, saveRegion, clearCycleData, isLoading };
}
