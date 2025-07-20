import { component$, type Signal, type QRL } from "@builder.io/qwik";
import { clsx } from "clsx";

interface AgeLevelToggleProps {
  activeLevel: Signal<string>;
  onLevelChange: QRL<(level: string) => void>;
}

export const AgeLevelToggle = component$<AgeLevelToggleProps>(
  ({ activeLevel, onLevelChange }) => {
    const levels = [
      { key: "5-year-old", label: "5 years" },
      { key: "10-year-old", label: "10 years" },
      { key: "15-year-old", label: "15 years" },
      { key: "citizen", label: "Citizen" },
    ];

    return (
      <div class="flex flex-wrap gap-2 mb-6">
        {levels.map((level) => (
          <button
            key={level.key}
            class={clsx(
              "px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer",
              activeLevel.value === level.key
                ? "bg-primary-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
            onClick$={() => onLevelChange(level.key)}
          >
            {level.label}
          </button>
        ))}
      </div>
    );
  },
);
