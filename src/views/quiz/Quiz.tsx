import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QcmQuestion from "../../components/quiz/QcmQuestion";
import TrueFalseQuestion from "../../components/quiz/TrueFalseQuestion";
import { useAuth } from "../../contexts/AuthContext";
import { QuizDto, UserAnswer } from "../../types/quiz";
import api from "../../api/axiosConfig";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import { getCategoryColor } from "../../helpers/categoryHelper";

const Quiz = () => {
  const { categoryId = "1" } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [quiz, setQuiz] = useState<QuizDto | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startQuiz = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/Quiz/StartQuiz?userId=${
            user?.id || 1
          }&categoryId=${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setQuiz(response.data);
      } catch (err) {
        console.error("Error starting quiz:", err);
        setError("Impossible de charger le quiz");
      } finally {
        setLoading(false);
      }
    };

    startQuiz();
  }, [categoryId, user?.id, token]);

  const handleAnswerSelect = (answerId: number) => {
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Ensure the selected answerId belongs to the current question
    const validAnswer = (currentQuestion.answers || []).find(
      (a) => a.id === answerId,
    );
    if (!validAnswer) {
      console.warn("Selected answerId not found in current question answers", {
        answerId,
        questionId: currentQuestion.id,
      });
      return;
    }

    setUserAnswers((prev) => {
      const newAnswers = prev.filter(
        (a) => a.questionId !== currentQuestion.id,
      );
      return [
        ...newAnswers,
        {
          questionId: currentQuestion.id,
          answerIdSelected: validAnswer.id,
        },
      ];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await api.post(
        "/api/Quiz/SubmitQuiz",
        {
          userId: user?.id || 1,
          categoryId: Number.parseInt(categoryId),
          userAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Redirection vers la page de résultats avec les résultats
      navigate("/quiz-result", { state: { quizResult: response.data } });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError("Erreur lors de la soumission du quiz");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg color-text">Chargement du quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg color-text">Aucune question disponible</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswerId = userAnswers.find(
    (a) => a.questionId === currentQuestion.id,
  )?.answerIdSelected;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const categoryTitle = (() => {
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
  })();
  const categoryColor = getCategoryColor(categoryTitle);

  return (
    <div className="flex flex-col h-screen pb-20">
      <Header
        title="Quiz"
        sticky={true}
        backgroundColor={categoryColor}
        borderColor={categoryColor}
      />

      <main>
        {/* Progress bar */}
        <div className="h-1">
          <div
            className="h-full transition-all duration-300"
            style={{
              backgroundColor: categoryColor,
              width: `${
                ((currentQuestionIndex + 1) / quiz.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        {/* Quiz title */}
        <div className="shadow-sm p-4">
          <p className="text-sm color-text">
            Question {currentQuestionIndex + 1} / {quiz.questions.length}
          </p>
        </div>

        {/* Question section (top) */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          {currentQuestion.typeQuestion === 1 ? (
            <TrueFalseQuestion
              question={currentQuestion}
              onAnswerSelect={handleAnswerSelect}
              onAutoNext={handleNextQuestion}
              selectedAnswerId={selectedAnswerId}
            />
          ) : (
            <QcmQuestion
              question={currentQuestion}
              onAnswerSelect={handleAnswerSelect}
              selectedAnswerId={selectedAnswerId}
            />
          )}
        </div>

        {/* Answers section (bottom) */}
        <div className="shadow-lg">
          {/* Navigation buttons */}
          <div className="flex gap-4 px-4 py-6">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="ghost"
              className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-300 font-semibold color-text disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswerId === undefined}
              variant="primary"
              className="flex-1 py-3 px-4 rounded-lg color-text font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: categoryColor }}
            >
              {isLastQuestion ? "Terminer" : "Suivant"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
