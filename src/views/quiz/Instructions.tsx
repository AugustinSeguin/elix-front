import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import { getCategoryColor } from "../../helpers/categoryHelper";

const Instructions = () => {
  const navigate = useNavigate();
  const { categoryId = "1" } = useParams<{ categoryId: string }>();

  const categoryTitle = useMemo(() => {
    try {
      const cached = localStorage.getItem("categories");
      if (!cached) return undefined;
      const categories = JSON.parse(cached) as Array<{
        id: number;
        title?: string;
      }>;
      return categories.find((category) => category.id === Number(categoryId))
        ?.title;
    } catch {
      return undefined;
    }
  }, [categoryId]);

  const categoryColor = getCategoryColor(categoryTitle);

  const handleStartQuiz = () => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Consignes Quiz"
        sticky={true}
        backgroundColor={categoryColor}
        borderColor={categoryColor}
      />

      <main>
        <div className="rounded-2xl shadow-sm p-5 mt-4">
          <h2 className="text-lg font-semibold mb-3 color-text">
            Le quiz, comment ça marche ? 
          </h2>

          <p className="color-text mb-4">
            Tu t'apprêtes à lancer un quiz de 10 questions environ pour tester tes
            connaissances.
          </p>

          <p className="color-text mb-4">
            Le but du jeu ? Répondre correctement à des questions vrai - faux en swipant les cartes à droite ou à gauche ou un QCM !
          </p>

          <p className="color-text mb-4">
            Prends ton temps, il n'y a pas de chrono : l'important est de bien
            comprendre chaque info.
          </p>

          <p className="color-text mb-3">À la fin du quiz, tu découvriras :</p>

          <ul className="list-disc pl-6 space-y-2 color-text">
            <li>📊 Ton score final.</li>
            <li>📈 Un petit message sur ta progression.</li>
            <li>
              📄 Ta fiche de révision à enregistrer pour garder les infos clés
              sous la main.
            </li>
          </ul>

          <p className="color-text mt-4">Prêt(e) ? À toi de jouer !</p>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleStartQuiz}
            variant="primary"
            size="lg"
            className="rounded-full font-semibold color-text"
            style={{ backgroundColor: categoryColor }}
          >
            Lancer le quiz
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Instructions;
