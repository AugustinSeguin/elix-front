import { forwardRef, useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectListProps {
  label?: string;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  fullWidth?: boolean;
  selectSize?: "sm" | "md" | "lg";
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const SelectList = forwardRef<HTMLDivElement, SelectListProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      error,
      helperText,
      placeholder = "Sélectionnez une option",
      fullWidth = false,
      selectSize = "md",
      multiple = false,
      searchable = false,
      disabled = false,
      className = "",
      id,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Génération d'un ID unique si non fourni
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Fermer le dropdown lors d'un clic extérieur
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filtrer les options selon la recherche
    const filteredOptions =
      searchable && searchTerm
        ? options.filter((opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    // Gérer la sélection d'une option
    const handleSelect = (optionValue: string) => {
      if (disabled) return;

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter((v) => v !== optionValue)
          : [...currentValues, optionValue];
        onChange?.(newValues);
      } else {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    // Vérifier si une option est sélectionnée
    const isSelected = (optionValue: string) => {
      if (multiple) {
        return Array.isArray(value) && value.includes(optionValue);
      }
      return value === optionValue;
    };

    // Obtenir le label affiché
    const getDisplayLabel = () => {
      if (multiple) {
        const selectedOptions = options.filter(
          (opt) => Array.isArray(value) && value.includes(opt.value)
        );
        if (selectedOptions.length === 0) return placeholder;
        if (selectedOptions.length === 1) return selectedOptions[0].label;
        return `${selectedOptions.length} sélectionnés`;
      }

      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    };

    // Styles de taille
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Styles de base pour le trigger
    const baseTriggerStyles =
      "flex items-center justify-between w-full rounded-lg border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed";

    // Styles conditionnels (normal vs erreur)
    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500";

    const triggerClassName =
      `${baseTriggerStyles} ${stateStyles} ${sizeStyles[selectSize]}`.trim();

    return (
      <div
        ref={ref}
        className={`flex flex-col gap-1.5 ${
          fullWidth ? "w-full" : ""
        } ${className}`}
      >
        {label && (
          <label
            htmlFor={selectId}
            className={`text-sm font-medium transition-colors ${
              isFocused
                ? "text-primary-600"
                : error
                ? "text-red-600"
                : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}

        <div ref={containerRef} className="relative">
          {/* Trigger Button */}
          <div
            id={selectId}
            className={triggerClassName}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={disabled ? -1 : 0}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {getDisplayLabel()}
            </span>
            <FaChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Options List */}
              <div className="overflow-y-auto max-h-48">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    Aucune option trouvée
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`
                        px-4 py-2 cursor-pointer flex items-center justify-between
                        transition-colors duration-150
                        ${
                          option.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-primary-50"
                        }
                        ${isSelected(option.value) ? "bg-primary-100" : ""}
                      `}
                      onClick={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                    >
                      <span
                        className={`text-sm ${
                          isSelected(option.value)
                            ? "font-medium text-primary-700"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </span>
                      {isSelected(option.value) && (
                        <FaCheck className="w-4 h-4 text-primary-600" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <span
            className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

SelectList.displayName = "SelectList";

export default SelectList;
