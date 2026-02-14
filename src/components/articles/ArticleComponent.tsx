import { useNavigate } from "react-router-dom";
import type { Article } from "../../types/article";

interface ArticleComponentProps {
  article: Article;
}

const ArticleComponent = ({ article }: ArticleComponentProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {article.mediaPath && (
        <img
          src={article.mediaPath}
          alt={article.title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )}
      <h3 className="text-lg font-bold color-text mb-1">{article.title}</h3>
      {article.subtitle && (
        <p className="text-sm text-primary font-medium mb-2">
          {article.subtitle}
        </p>
      )}
      <p className="color-text text-sm line-clamp-3">{article.content}</p>
    </div>
  );
};

export default ArticleComponent;
