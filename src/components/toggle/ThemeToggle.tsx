import { useEffect, useState } from "react";

interface ThemeToggleProps {
  label: string;
  ItemComponent: React.ComponentType<{
    label: string;
    toggle: boolean;
    onToggle: (val: boolean) => void;
  }>;
}

const ThemeToggle = ({ label, ItemComponent }: ThemeToggleProps) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return <ItemComponent label={label} toggle={enabled} onToggle={setEnabled} />;
};

export default ThemeToggle;
