"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { REGIONS } from "@/libs/regionalFoods";

export default function RegionSelector({ isOpen, onClose, currentRegion, onSelect }) {
  const handleSelect = (regionKey) => {
    onSelect(regionKey);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <div className="text-center mb-6">
                  <span className="text-4xl">{"\uD83C\uDF0E"}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)] mt-2">
                    Elige tu region
                  </h2>
                  <p className="text-sm text-[var(--color-dark)]/50 mt-1">
                    Recomendaremos alimentos que encuentras en tu zona
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {REGIONS.map((region) => {
                    const isSelected = currentRegion === region.key;
                    return (
                      <button
                        key={region.key}
                        onClick={() => handleSelect(region.key)}
                        className={`flex flex-col items-center gap-1 p-3 sm:p-4 rounded-2xl border-2 transition-all text-center ${
                          isSelected
                            ? "border-[var(--color-sage)] bg-[var(--color-sage)]/10"
                            : "border-transparent glass hover:border-[var(--color-sage)]/30"
                        }`}
                      >
                        <span className="text-2xl">{region.emoji}</span>
                        <span className="font-semibold text-sm text-[var(--color-dark)]">
                          {region.label}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[var(--color-dark)]/40 leading-tight">
                          {region.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={onClose}
                  className="btn btn-ghost w-full mt-4 text-[var(--color-dark)]/50"
                >
                  Cancelar
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
