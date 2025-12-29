import { useNavigate } from "react-router-dom";
import Categories from "../../components/category/Categories";

const RunQuiz = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-8 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lancer un quiz</h1>
        <p className="text-gray-500 mt-1">Choisis le thème</p>
      </div>

      <Categories onSelect={handleCategorySelect} />
    </div>
  );
};

export default RunQuiz;
