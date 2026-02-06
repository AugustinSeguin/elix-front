import Question from "./Question";
import Answer from "./Answer";
import { QuestionDto } from "../../types/quiz";

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
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl bg-primary/10 shadow-sm">
        <Question
          title={question.title}
          mediaPath={question.mediaPath ?? undefined}
        />
      </div>

      <Answer
        answers={question.answers || []}
        onAnswerSelect={onAnswerSelect}
        selectedAnswerId={selectedAnswerId}
      />
    </div>
  );
};

export default QcmQuestion;
