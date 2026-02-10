// KHONG SUA KHI DOI GAME
export interface UseQuizAPIOptions {
  onAnswerCorrect?: (params: {
    currentQuestionIndex: number;
    correctAnswerId?: number;
    incorrectAnswerId?: number
  }) => void;
  onAnswerIncorrect?: (params: {
    currentQuestionIndex: number;
    correctAnswerId?: number;
    incorrectAnswerId?: number
  }) => void;
}

export interface AnswerOption {
  id: number;
  content: string;
}
