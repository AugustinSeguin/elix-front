import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axiosConfig";

interface ArticleData {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  mediaPath: string | null;
  footer: string | null;
  categoryId: number;
  category: null;
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
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white px-6 pt-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoArrowBack size={24} />
          </button>
        </div>
        <div className="text-center text-red-500">
          {error || "Article introuvable"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header avec image ou juste bouton retour */}
      <div className="relative">
        {article.mediaPath ? (
          <div className="h-64 w-full relative">
            <img
              src={article.mediaPath}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent"></div>
            <button
              onClick={() => navigate(-1)}
              className="absolute top-8 left-6 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <IoArrowBack size={24} />
            </button>
          </div>
        ) : (
          <div className="px-6 pt-8 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoArrowBack size={24} />
            </button>
          </div>
        )}
      </div>

      <div className="px-6 -mt-6 relative z-10 bg-white rounded-t-3xl pt-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-lg text-primary font-medium mb-6">
            {article.subtitle}
          </p>
        )}

        <div className="prose prose-gray max-w-none">
          {article.content.split("\n").map(
            (paragraph, index) =>
              paragraph.trim() && (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              )
          )}
        </div>

        {article.footer && (
          <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500 italic">
            {article.footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
