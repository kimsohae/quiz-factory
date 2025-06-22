
export type Answer = {
  quizId: string;
  optionId: string;
  isCorrect?:boolean;
  correctRate?:number;
}

export type User = {
  progress: number; // 진행도 0~1
  score: number; // 점수
};

export const RANKS = ["stone", "desert", "grass", "plant", "rice", "jungle"] as const;
export type Rank = typeof RANKS[number];

export type Category = 'macro' | 'savings' | 'pension' | 'realEstate' | 'stocks' | 'finance';

export type QuestionOption = {
    text: string;
};
  
export type Question = {
    id: string;
    context?: string; // 질문 배경 설명
    question: string; // 질문
    options: string[];
    explanation: string;
    correctAnswer: number;
    correctRate?: number;
};

export interface QuizTheme {
  primaryColor: string;
  font?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  thumbnail?: string; // 썸네일 URL 추가
  questions: Question[];
  theme: {
    primaryColor: string;
  };
  createdAt: Date;
  createdBy?: string;
  kakaoShareEnabled?: boolean;
  shuffleQuestions?: boolean; // 문제 순서 섞기 옵션 추가
  questionCount?: number; // 퀴즈 목록에서 문제 개수 표시용
}

export interface QuizResult {
  quizId: string;
  answers: number[];
  score: number;
  completedAt: Date;
}

/** API RESPONSE */
export type UserResult = {
    id: string;
    score: number;
    rank: Rank;
    ranking: {
      total: number;
      position: number;
    }
    wrongAnswers: Answer[];
    analysis?: string;
}
