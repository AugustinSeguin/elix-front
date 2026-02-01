import { useNavigate } from "react-router-dom";
import Categories from "../../components/category/Categories";
import Header from "../../components/header/Header";

const ArticlesList = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/articles/${categoryId}`);
  };

  return (
    <div className="min-h-screen pb-24">
      <Header title="Articles" sticky={true}></Header>

      <div className="mb-8">
        <p className="text-black mt-1">Choisis le thème</p>
      </div>

      <Categories onSelect={handleCategorySelect} />
    </div>
  );
};

export default ArticlesList;
