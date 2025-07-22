import { component$, type Signal, type QRL } from "@builder.io/qwik";
import { clsx } from "clsx";
import { AGE_LEVELS, AGE_LEVEL_LABELS } from "../constants/age-levels.constant";

interface AgeLevelToggleProps {
  activeLevel: Signal<string>;
  onLevelChange: QRL<(level: string) => void>;
}

export const AgeLevelToggle = component$<AgeLevelToggleProps>(
  ({ activeLevel, onLevelChange }) => {
    const levels = AGE_LEVELS.map(level => ({
      key: level,
      label: AGE_LEVEL_LABELS[level]
    }));

    return (
      <div class="grid grid-cols-4 gap-2 my-2">
        {levels.map((level) => (
          <button
            key={level.key}
            class={clsx(
              "px-2 py-2 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer min-w-0 text-center",
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
