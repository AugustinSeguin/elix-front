import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputTextProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      inputSize = "md",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Génération d'un ID unique si non fourni
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Styles de base pour l'input
    const baseInputStyles =
      "rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed";

    // Styles conditionnels (normal vs erreur)
    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900"
      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 color-text";

    // Styles de taille
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Style pour largeur complète
    const widthStyle = fullWidth ? "w-full" : "";

    // Combinaison de tous les styles
    const inputClassName =
      `${baseInputStyles} ${stateStyles} ${sizeStyles[inputSize]} ${widthStyle} ${className}`.trim();

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
                  : "color-text"
            }`}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputClassName}
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

        {(error || helperText) && (
          <span className={`text-sm ${error ? "text-red-600" : "color-text"}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  },
);

InputText.displayName = "InputText";

export default InputText;
