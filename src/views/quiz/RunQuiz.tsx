import { useNavigate } from "react-router-dom";
import Categories from "../../components/category/Categories";
import Header from "../../components/header/Header";

const RunQuiz = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/instructions/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Lancer un quiz" sticky={true} />

      <main>
        <div className="mb-4">
          <p className="color-text mt-1">Choisis le thème</p>
        </div>

        <Categories onSelect={handleCategorySelect} />
      </main>
    </div>
  );
};

export default RunQuiz;
