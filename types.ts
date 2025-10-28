
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface UserAnswers {
  [key: number]: string;
}
