import { IconType } from "react-icons";

interface IconProps {
  icon: IconType;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  color?: string;
  onClick?: () => void;
}

const Icon = ({
  icon: IconComponent,
  size = "md",
  className = "",
  color,
  onClick,
}: IconProps) => {
  // Map de tailles avec Tailwind
  const sizeMap = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
  };

  // Styles conditionnels
  const colorClass = color ? "" : "text-current";
  const clickableClass = onClick
    ? "cursor-pointer hover:opacity-80 transition-opacity"
    : "";

  // Combinaison des classes
  const combinedClassName =
    `${sizeMap[size]} ${colorClass} ${clickableClass} ${className}`.trim();

  return (
    <IconComponent
      className={combinedClassName}
      style={color ? { color } : undefined}
      onClick={onClick}
    />
  );
};

export default Icon;
