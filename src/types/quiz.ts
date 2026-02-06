interface AnswerDto {
  id: number;
  questionId: number;
  title?: string;
  explanation?: string | null;
  isValid: boolean;
}

interface QuestionDto {
  id: number;
  title: string;
  mediaPath?: string | null;
  categoryId: number;
  typeQuestion?: number;
  answers?: AnswerDto[];
}

interface QuizQuestionResultDto {
  questionId: number;
  question: QuestionDto;
  selectedAnswerId: number;
  isCorrect: boolean;
  explanation?: string | null;
  answer: AnswerDto;
}

interface UserAnswer {
  questionId: number;
  answerIdSelected: number;
}

interface QuizDto {
  id: number;
  title: string;
  categoryId: number;
  questions: QuestionDto[];
}

export type {
  QuestionDto,
  AnswerDto,
  QuizQuestionResultDto,
  UserAnswer,
  QuizDto,
};
