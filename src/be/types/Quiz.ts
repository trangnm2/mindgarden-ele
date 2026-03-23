// KHONG SUA KHI DOI GAME
export interface QuizAnswer {
  id: number;
  content: string;
}

export interface Question {
  id: number;
  question: string;
  type: "text" | "image" | "latex";
  imageUrl?: string;
  answers: string[];
  correctIndex: number;
}
