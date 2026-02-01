import { InputHTMLAttributes, forwardRef, useEffect, useRef } from "react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
  checkboxSize?: "sm" | "md" | "lg";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      indeterminate = false,
      checkboxSize = "md",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as any) || internalRef;

    // Génération d'un ID unique si non fourni
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    // Gestion de l'état indeterminate
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, checkboxRef]);

    // Styles de taille pour la checkbox
    const sizeStyles = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    // Styles de taille pour le label
    const labelSizeStyles = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    // Styles de base pour la checkbox
    const baseStyles =
      "rounded border-2 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Styles conditionnels (normal vs erreur)
    const stateStyles = error
      ? "border-red-500 text-red-600 focus:ring-red-500"
      : "border-gray-300 text-primary focus:ring-primary checked:border-primary checked:bg-primary accent-primary";

    const checkboxClassName =
      `${baseStyles} ${stateStyles} ${sizeStyles[checkboxSize]} ${className}`.trim();

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <input
            ref={checkboxRef}
            type="checkbox"
            id={checkboxId}
            className={checkboxClassName}
            {...props}
          />

          {label && (
            <label
              htmlFor={checkboxId}
              className={`cursor-pointer select-none ${
                error ? "text-red-600" : "text-black"
              } ${labelSizeStyles[checkboxSize]}`}
            >
              {label}
            </label>
          )}
        </div>

        {(error || helperText) && (
          <span
            className={`text-sm ml-7 ${error ? "text-red-600" : "text-black"}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
