type CategoryName =
  | "cyberviolence"
  | "contraception"
  | "psycho-émotionnel"
  | "consentement"
  | "anatomie";

const getCategoryColor = (category?: string): string => {
  const normalized = category?.trim().toLowerCase();

  switch (normalized as CategoryName | undefined) {
    case "cyberviolence":
      return "#FED8D0";
    case "contraception":
      return "#BFE8B7";
    case "psycho-émotionnel":
      return "#E8D8E7";
    case "consentement":
      return "#B4D8F3";
    case "anatomie":
      return "#FEDAEF";
    default:
      return "var(--color-primary-700)";
  }
};

export { getCategoryColor };
