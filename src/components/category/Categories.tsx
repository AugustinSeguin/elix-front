import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { FaPlay } from "react-icons/fa";

interface Category {
  id: number;
  title: string;
  description: string | null;
  imageMediaPath: string;
}

interface CategoriesProps {
  onSelect?: (categoryId: number) => void;
}

const Categories = ({ onSelect }: CategoriesProps) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      // Vérifier le cache d'abord
      const cachedData = localStorage.getItem("categories");
      if (cachedData) {
        setCategories(JSON.parse(cachedData));
        setLoading(false);
      }

      try {
        const response = await axios.get("/api/Category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
        // Mettre à jour le cache
        localStorage.setItem("categories", JSON.stringify(response.data));
      } catch (err) {
        console.error("Error fetching categories:", err);
        if (!cachedData) {
          setError("Impossible de charger les catégories");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {categories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => onSelect && onSelect(category.id)}
          className="flex items-center p-3 bg-blue-50 rounded-2xl cursor-pointer hover:bg-blue-100 transition-colors shadow-sm"
        >
          <div className="flex-shrink-0">
            <img
              src={category.imageMediaPath}
              alt={category.title}
              className="w-16 h-16 rounded-xl object-cover"
              onError={(e) => {
                // Fallback image if load fails
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/64x64?text=IMG";
              }}
            />
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-base truncate">
              {index + 1}. {category.title}
            </h3>
          </div>
          <div className="ml-2 text-primary">
            <FaPlay className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
