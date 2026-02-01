import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axiosConfig";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

interface ArticleData {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  mediaPath: string | null;
  footer: string | null;
  categoryId: number;
  category: {
    id: number;
    name: string;
  } | null;
}

const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!token || !articleId) return;

      try {
        const response = await api.get(`/api/Article/${articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Impossible de charger l'article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen px-6 pt-8 flex flex-col items-center justify-center">
        <div className="text-center text-red-500">
          {error || "Article introuvable"}
        </div>
        <Button
          onClick={() => navigate(-1)}
          variant="primary"
          className="mt-6 px-6 py-2 bg-primary-500 text-white rounded-full hover:opacity-90"
        >
          Retour
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mb-4">
        <Header title="Article" sticky={true}></Header>
      </div>

      {/* Badge catégorie */}
      {article.category && (
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-green-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
            {article.category.name}
          </span>
        </div>
      )}

      {/* Image */}
      {article.mediaPath && (
        <div className="px-6 py-4">
          <img
            src={article.mediaPath}
            alt={article.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}

      {/* Contenu */}
      <div className="px-6 py-6 pb-28">
        {/* Titre avec emphasis */}
        <h2 className="text-2xl font-bold text-black mb-6 leading-tight">
          {article.title}
        </h2>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="text-base text-black font-medium mb-6">
            {article.subtitle}
          </p>
        )}

        {/* Contenu principal */}
        <div className="text-sm text-black leading-relaxed space-y-4">
          {article.content
            .split("\n")
            .map(
              (paragraph, index) =>
                paragraph.trim() && <p key={index}>{paragraph}</p>,
            )}
        </div>

        {/* Footer */}
        {article.footer && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-black italic">
            {article.footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
