import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionCorrection from "../../components/quiz/QuestionCorrection";

interface AnswerDto {
  id: number;
  questionId: number;
  title?: string;
  explanation?: string;
  isValid: boolean;
}

interface QuestionDto {
  id: number;
  title: string;
  mediaPath?: string;
  categoryId: number;
  answers?: AnswerDto[];
}

interface QuizQuestionResultDto {
  questionId: number;
  question: QuestionDto;
  selectedAnswerId: number;
  isCorrect: boolean;
  explanation?: string | null;
  answer: AnswerDto; // Correct answer returned by API
}

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<
    QuizQuestionResultDto[] | null
  >(null);

  useEffect(() => {
    const state = location.state as
      | { quizResult: QuizQuestionResultDto[] }
      | undefined;
    if (!state?.quizResult || !Array.isArray(state.quizResult)) {
      navigate("/quiz");
      return;
    }
    setQuizResults(state.quizResult);
  }, [location, navigate]);

  const totalQuestions = quizResults ? quizResults.length : 0;
  const score = quizResults ? quizResults.filter((r) => r.isCorrect).length : 0;
  const percentage = totalQuestions
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  if (!quizResults) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Chargement des résultats...</p>
      </div>
    );
  }

  // Déterminer la couleur en fonction du score
  const getResultColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getResultMessage = () => {
    if (percentage >= 80) return "Excellent !";
    if (percentage >= 60) return "Bien joué !";
    if (percentage >= 40) return "À améliorer";
    return "À refaire";
  };

  const getResultDescription = () => {
    if (percentage === 100) return "Parfait ! Vous maîtrisez ce sujet.";
    if (percentage >= 80)
      return "Très bien ! Vous avez une bonne compréhension.";
    if (percentage >= 60) return "Vous avez compris les bases.";
    return "Vous pouvez refaire ce quiz pour progresser.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Résultats du Quiz</h1>
        <p className="text-blue-100">
          Score: {score}/{totalQuestions}
        </p>
      </div>

      {/* Score container */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Circular score display */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="relative w-48 h-48">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${(percentage / 100) * 565.48} 565.48`}
                className={getResultColor()}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getResultColor()}`}>
                {percentage}%
              </span>
              <span className="text-gray-600 text-sm mt-2">
                {score}/{totalQuestions}
              </span>
            </div>
          </div>

          <div className="text-center">
            <h2 className={`text-3xl font-bold ${getResultColor()}`}>
              {getResultMessage()}
            </h2>
            <p className="text-gray-600 mt-2">{getResultDescription()}</p>
          </div>
        </div>

        {/* Detailed corrections */}
        <QuestionCorrection results={quizResults} />

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/quiz")}
            className="flex-1 py-3 px-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Refaire le quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 px-4 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold hover:bg-blue-50 transition-colors"
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
