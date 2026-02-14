import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Article } from "../../types/article";
import api from "../../api/axiosConfig";
import Header from "../../components/header/Header";
import ArticleComponent from "../../components/articles/ArticleComponent";

interface ArticlesByCategoryProps {
  categoryId?: number;
  showHeader?: boolean;
  maxArticles?: number;
}

const ArticlesByCategory = ({
  categoryId: propCategoryId,
  showHeader = true,
  maxArticles,
}: ArticlesByCategoryProps) => {
  const { categoryId: paramCategoryId } = useParams();
  const { token } = useAuth();

  const finalCategoryId = propCategoryId || paramCategoryId;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!token || !finalCategoryId) return;

      try {
        const response = await api.get(
          `/api/Article/category/${finalCategoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const allArticles = response.data;
        setArticles(
          maxArticles ? allArticles.slice(0, maxArticles) : allArticles,
        );
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Impossible de charger les articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [finalCategoryId, token]);

  if (!finalCategoryId) {
    return (
      <div className="text-center py-4 color-text">
        Aucune catégorie spécifiée.
      </div>
    );
  }

  return (
    <>
      {showHeader && (
        <div className="min-h-screen pb-24">
          <Header title="Articles" sticky={true} />
          <main>{renderContent()}</main>
        </div>
      )}
      {!showHeader && renderContent()}
    </>
  );

  function renderContent() {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (error) {
      return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    if (articles.length === 0) {
      return (
        <div className="text-center py-12 color-text">
          Aucun article disponible dans cette catégorie.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleComponent key={article.id} article={article} />
        ))}
      </div>
    );
  }
};

export default ArticlesByCategory;
