import { z } from "zod";

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




export interface QuizResult {
  quizId: string;
  answers: number[];
  score: number;
  completedAt: Date;
}


/**
 * Qustion, Quiz: 
 * 입력폼 검증 위해 zod 사용
 */

export const questionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "질문을 입력해주세요"),
  options: z.array(z.string().min(1, "선택지를 입력해주세요")).min(2, "최소 2개의 선택지가 필요합니다"),
  correctAnswer: z.number().min(0, "정답을 선택해주세요"),
  explanation: z.string().optional(),
});

const quizThemeSchema = z.object({
  primaryColor: z.string().min(1),
  font: z.string().optional(),
  }
);

export const quizSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "퀴즈 제목을 입력해주세요").max(50, "제목은 50자 이하로 입력해주세요"),
  description: z.string().max(100, "설명은 100자 이하로 입력해주세요").optional(),
  questions: z.array(questionSchema).min(1, "최소 1개의 문항을 추가해주세요"),
  thumbnail: z.string().optional(),
  theme: quizThemeSchema,
  shuffleQuestions: z.boolean().optional(),
  kakaoShareEnabled: z.boolean().optional(),
  createdAt: z.date(),
  createdBy: z.string().optional(),
});






export type Quiz = z.infer<typeof quizSchema>;
export type Question = z.infer<typeof questionSchema>;
export type QuizTheme = z.infer<typeof quizThemeSchema>;


// export type Question = {
//   id: string;
//   context?: string; // 질문 배경 설명
//   question: string; // 질문
//   options: string[];
//   explanation: string;
//   correctAnswer: number;
//   correctRate?: number;
// };

// export interface Quiz {
// id: string;
// title: string;
// description: string;
// thumbnail?: string; // 썸네일 URL 추가
// questions: Question[];
// theme: {
//   primaryColor: string;
// };
// createdAt: Date;
// createdBy?: string;
// kakaoShareEnabled?: boolean;
// shuffleQuestions?: boolean; // 문제 순서 섞기 옵션 추가
// questionCount?: number; // 퀴즈 목록에서 문제 개수 표시용
// }

// export type QuestionOption = {
//     text: string;
// };


// 미사용

// export const RANKS = ["stone", "desert", "grass", "plant", "rice", "jungle"] as const;
// export type Rank = typeof RANKS[number];
// export type Category = 'macro' | 'savings' | 'pension' | 'realEstate' | 'stocks' | 'finance';

/** API RESPONSE */
// export type UserResult = {
//     id: string;
//     score: number;
//     rank: Rank;
//     ranking: {
//       total: number;
//       position: number;
//     }
//     wrongAnswers: Answer[];
//     analysis?: string;
// }
