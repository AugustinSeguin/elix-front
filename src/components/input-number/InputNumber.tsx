import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../button/Button";

interface InputNumberProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  inputSize?: "sm" | "md" | "lg";
  showControls?: boolean;
  step?: number;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      inputSize = "md",
      showControls = true,
      step = 1,
      min,
      max,
      value,
      onChange,
      className = "",
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Génération d'un ID unique si non fourni
    const inputId =
      id || `input-number-${Math.random().toString(36).substr(2, 9)}`;

    // Fonction pour incrémenter/décrémenter
    const handleAdjust = (adjustment: number) => {
      if (disabled || !onChange) return;

      const currentValue =
        typeof value === "number" ? value : parseFloat(value as string) || 0;
      let newValue = currentValue + adjustment;

      // Respect des limites min/max
      if (min !== undefined && newValue < Number(min)) newValue = Number(min);
      if (max !== undefined && newValue > Number(max)) newValue = Number(max);

      // Création d'un événement synthétique
      const event = {
        target: { value: newValue.toString() },
        currentTarget: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    };

    // Styles de base pour l'input
    const baseInputStyles =
      "rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed text-center";

    // Styles conditionnels (normal vs erreur)
    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900"
      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 text-black";

    // Styles de taille
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Styles des boutons
    const buttonSizeStyles = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    // Style pour largeur complète
    const widthStyle = fullWidth ? "w-full" : "";

    // Combinaison de tous les styles
    const inputClassName = `${baseInputStyles} ${stateStyles} ${
      sizeStyles[inputSize]
    } ${showControls ? "" : widthStyle} ${className}`.trim();

    const buttonBaseStyles =
      "flex items-center justify-center rounded-lg border-2 border-gray-300 active:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`text-sm font-medium transition-colors ${
              isFocused
                ? "text-primary-600"
                : error
                  ? "text-red-600"
                  : "text-black"
            }`}
          >
            {label}
          </label>
        )}

        <div className={`flex items-center gap-2 ${fullWidth ? "w-full" : ""}`}>
          {showControls && (
            <Button
              type="button"
              onClick={() => handleAdjust(-step)}
              disabled={
                disabled || (min !== undefined && Number(value) <= Number(min))
              }
              variant="ghost"
              size="sm"
              className={`${buttonBaseStyles} ${buttonSizeStyles[inputSize]} p-0`}
              aria-label="Décrémenter"
            >
              <FaMinus className="w-3 h-3 text-black" />
            </Button>
          )}

          <input
            ref={ref}
            type="number"
            id={inputId}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={inputClassName}
            style={{ flex: showControls ? 1 : undefined }}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {showControls && (
            <Button
              type="button"
              onClick={() => handleAdjust(step)}
              disabled={
                disabled || (max !== undefined && Number(value) >= Number(max))
              }
              variant="ghost"
              size="sm"
              className={`${buttonBaseStyles} ${buttonSizeStyles[inputSize]} p-0`}
              aria-label="Incrémenter"
            >
              <FaPlus className="w-3 h-3 text-black" />
            </Button>
          )}
        </div>

        {(error || helperText) && (
          <span className={`text-sm ${error ? "text-red-600" : "text-black"}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  },
);

InputNumber.displayName = "InputNumber";

export default InputNumber;
