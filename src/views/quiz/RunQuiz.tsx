import { useNavigate } from "react-router-dom";
import Categories from "../../components/category/Categories";
import Header from "../../components/header/Header";

const RunQuiz = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mb-4">
        <Header title="Lancer un quiz" sticky={true} />
      </div>

      <div className="mb-4">
        <p className="text-black mt-1">Choisis le thème</p>
      </div>
      
      <Categories onSelect={handleCategorySelect} />
    </div>
  );
};

export default RunQuiz;
