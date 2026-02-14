import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Progress from "../components/progress/Progress";
import ArticleComponent from "../components/articles/ArticleComponent";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axiosConfig";
import { getCategoryColor } from "../helpers/categoryHelper";
import type { Category } from "../types/category";
import type { Article } from "../types/article";

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const categories = useMemo(() => {
    try {
      const cached = localStorage.getItem("categories");
      if (!cached) return [] as Category[];
      return JSON.parse(cached) as Category[];
    } catch {
      return [] as Category[];
    }
  }, []);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      if (!token) {
        setArticlesLoading(false);
        return;
      }

      try {
        const response = await api.get<Article[]>("/api/Article/latest", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setLatestArticles(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
        setLatestArticles([]);
      } finally {
        setArticlesLoading(false);
      }
    };

    fetchLatestArticles();
  }, [token]);

  const firstThreeCategories = categories.slice(0, 3);

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/instructions/${categoryId}`);
  };

  const handleSeeMoreQuiz = () => {
    navigate("/run-quiz");
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Header title="EliX" sticky={true} />

      <main>
        {/* Salut section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold color-text">
            Salut {user?.firstname || "utilisateur"} !
          </h2>
        </div>

        {/* Les derniers quiz */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold color-text">
              Les derniers quiz
            </h3>
            <button
              onClick={handleSeeMoreQuiz}
              className="text-sm color-text font-medium hover:underline"
            >
              Voir tous les quiz
            </button>
          </div>

          {firstThreeCategories.length > 0 ? (
            <div className="space-y-3 w-full">
              {firstThreeCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="flex items-center p-3 rounded-2xl cursor-pointer transition-colors shadow-sm"
                  style={{ backgroundColor: getCategoryColor(category.title) }}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        category.imageMediaPath?.startsWith("http")
                          ? category.imageMediaPath
                          : `https://api.elix.cleanascode.fr/uploads/${category.imageMediaPath}`
                      }
                      alt={category.title}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/64x64?text=IMG";
                      }}
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="font-semibold text-black text-sm truncate">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm color-text">Aucun quiz disponible.</p>
          )}
        </div>

        {/* Mon avancée */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold color-text mb-4">Mon avancée</h3>
          <Progress />
        </div>

        {/* Les derniers articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold color-text">
              Les derniers articles
            </h3>
            <button
              onClick={() => navigate("/articles")}
              className="text-sm color-text font-medium hover:underline"
            >
              Voir tous les articles
            </button>
          </div>

          {articlesLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : latestArticles.length > 0 ? (
            <div className="space-y-4">
              {latestArticles.map((article) => (
                <ArticleComponent key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-sm color-text">Aucun article disponible.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
