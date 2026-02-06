import { QuestionDto } from "../../types/quiz";
import { getCategoryColor } from "../../helpers/categoryHelper";

interface QcmQuestionProps {
  question: QuestionDto;
  selectedAnswerId?: number;
  onAnswerSelect: (answerId: number) => void;
}

const QcmQuestion = ({
  question,
  selectedAnswerId,
  onAnswerSelect,
}: QcmQuestionProps) => {
  const categoryTitle = (() => {
    try {
      const cached = localStorage.getItem("categories");
      if (!cached) return undefined;
      const categories = JSON.parse(cached) as Array<{
        id: number;
        title?: string;
      }>;
      return categories.find((category) => category.id === question.categoryId)
        ?.title;
    } catch {
      return undefined;
    }
  })();

  const categoryColor = getCategoryColor(categoryTitle);

  // Calcul du pourcentage pour la barre de progression
  return (
    <div className="flex flex-col px-6 py-4 max-w-md mx-auto w-full">
      {/* Titre "Quiz" et Question */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-extrabold color-text leading-tight">
          {question.title}
        </h2>
      </div>

      {/* Liste des Réponses (QCM) */}
      <div className="flex flex-col gap-3">
        {(question.answers || []).map((answer, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswerId === answer.id;

          return (
            <button
              key={answer.id}
              onClick={() => onAnswerSelect(answer.id)}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left border-gray-100 bg-white hover:border-gray-200"
              `}
            >
              {/* Checkbox custom */}
              <div
                className={`mt-1 min-w-[20px] h-[20px] border-2 rounded flex items-center justify-center border-gray-400 ${
                  isSelected ? "bg-white" : "bg-white"
                }`}
                style={{
                  backgroundColor: isSelected ? categoryColor : "white",
                }}
              ></div>

              <p className="text-sm font-medium text-gray-800">
                <span className="font-bold">{letter}.</span> {answer.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QcmQuestion;
