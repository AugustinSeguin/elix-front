import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Header from "../header/Header";
import InputText from "../input-text/InputText";

interface ResourcesHeaderProps {
  activeTab: "list" | "map";
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ResourcesHeader = ({
  activeTab,
  searchTerm,
  onSearchChange,
}: ResourcesHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Ressources" />

      {/* Search Bar */}
      <div className="relative mb-6">
        <InputText
          type="text"
          placeholder="Ressource recherchée"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
        />
        <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-lg pointer-events-none" />
      </div>

      {/* Toggle Switch */}
      <div className="flex rounded-full p-1 gap-4 mb-2">
        <Button
          onClick={() => navigate("/resources")}
          variant="ghost"
          size="sm"
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === "list"
              ? "bg-secondary text-black shadow-sm"
              : "text-black border border-gray-200"
          }`}
        >
          Liste
        </Button>
        <Button
          onClick={() => navigate("/resources/map")}
          variant="ghost"
          size="sm"
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === "map"
              ? "bg-secondary text-black shadow-sm"
              : "text-black border border-gray-200"
          }`}
        >
          Carte
        </Button>
      </div>
    </div>
  );
};

export default ResourcesHeader;
