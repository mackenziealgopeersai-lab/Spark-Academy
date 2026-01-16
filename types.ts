
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  topic: string;
  questions: QuizQuestion[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  CHAT = 'CHAT',
  QUIZ = 'QUIZ',
  QUIZ_RESULTS = 'QUIZ_RESULTS'
}
