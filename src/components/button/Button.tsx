import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    // Styles de base pour tous les boutons
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Styles par variante
    const variantStyles = {
      primary:
        "bg-primary text-[#000] hover:opacity-90 focus:ring-primary active:opacity-100",
      secondary:
        "bg-secondary text-[#000] hover:opacity-90 focus:ring-secondary active:opacity-100",
      outline:
        "border-2 border-primary text-[#000] hover:bg-primary/10 focus:ring-primary active:bg-primary/20",
      ghost:
        "text-[#000] hover:bg-primary/10 focus:ring-primary active:bg-primary/20",
      danger:
        "bg-red-500 text-[#000] hover:bg-red-600 focus:ring-red-500 active:bg-red-700",
    };

    // Styles par taille
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg w-full",
    };

    // Style pour largeur complète
    const widthStyle = fullWidth ? "w-full" : "";

    // Combinaison de tous les styles
    const combinedClassName =
      `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {label || children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
