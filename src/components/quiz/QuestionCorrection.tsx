import { QuestionDto, QuizQuestionResultDto } from "../../types/quiz";

const QuestionCorrection = ({
  results,
}: {
  results: QuizQuestionResultDto[];
}) => {
  const getSelectedAnswerTitle = (q: QuestionDto, selectedId: number) => {
    const found = (q.answers || []).find((a) => a.id === selectedId);
    return found?.title || "";
  };

  const correctCount = results.filter((r) => r.isCorrect).length;
  const total = results.length || 10;

  return (
    <div className="rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-black">Corrections</h3>
        <span className="text-sm font-semibold text-gray-600">
          Note: {correctCount}/{total}
        </span>
      </div>
      <div className="space-y-4">
        {results.map((res, idx) => {
          const userAnswerTitle = getSelectedAnswerTitle(
            res.question,
            res.selectedAnswerId
          );
          const correctAnswerTitle = res.answer?.title || "";
          const isCorrect = res.isCorrect;

          return (
            <div
              key={`${res.questionId}-${idx}`}
              className={`p-4 rounded-lg border ${
                isCorrect
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <p className="font-semibold text-black">
                Question {idx + 1}: {res.question.title}
              </p>
              <p
                className={`mt-1 text-sm ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "Bonne réponse:" : "Votre réponse:"}{" "}
                {userAnswerTitle}
              </p>
              {!isCorrect && (
                <p className="mt-1 text-sm">
                  <span className="font-semibold text-blue-600">
                    Correction:
                  </span>{" "}
                  <span className="text-gray-700">{correctAnswerTitle}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCorrection;
