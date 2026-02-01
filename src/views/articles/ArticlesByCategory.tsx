import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Article } from "../../types/article";
import api from "../../api/axiosConfig";
import Header from "../../components/header/Header";

const ArticlesByCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  useEffect(() => {
    // Tenter de récupérer le titre de la catégorie depuis le cache
    const cachedCategories = localStorage.getItem("categories");
    if (cachedCategories && categoryId) {
      const categories = JSON.parse(cachedCategories);
      const category = categories.find((c: any) => c.id === Number(categoryId));
      if (category) {
        setCategoryTitle(category.title);
      }
    }
  }, [categoryId]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!token || !categoryId) return;

      try {
        const response = await api.get(`/api/Article/category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Impossible de charger les articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId, token]);

  const handleArticleClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="min-h-screen pb-24">
      <Header title="Articles" sticky={true}></Header>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-black">
          Aucun article disponible dans cette catégorie.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {article.mediaPath && (
                <img
                  src={article.mediaPath}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-black mb-1">
                {article.title}
              </h3>
              {article.subtitle && (
                <p className="text-sm text-primary font-medium mb-2">
                  {article.subtitle}
                </p>
              )}
              <p className="text-black text-sm line-clamp-3">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesByCategory;
