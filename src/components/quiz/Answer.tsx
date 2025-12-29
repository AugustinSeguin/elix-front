interface AnswerOption {
  id: number;
  title?: string;
}

interface AnswerProps {
  answers: AnswerOption[];
  onAnswerSelect: (answerId: number) => void;
  selectedAnswerId?: number;
}

const Answer = ({ answers, onAnswerSelect, selectedAnswerId }: AnswerProps) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-6">
      {answers.map((answer, index) => (
        <button
          key={answer.id}
          onClick={() => onAnswerSelect(answer.id)}
          className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
            selectedAnswerId === answer.id
              ? "border-primary bg-primary"
              : "border-gray-300 bg-white hover:border-primary"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {letters[index]}
            </span>
            <p className="text-sm text-gray-700 text-center">{answer.title}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Answer;
