import { useState } from "react";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
}

const Toggle = ({ enabled, onChange, label }: ToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-gray-700 font-medium">{label}</span>}
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
