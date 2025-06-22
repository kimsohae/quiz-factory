import { Quiz, QuizResult } from '@/types/quiz';

const QUIZ_STORAGE_KEY = 'quiz-maker-quizzes';
const RESULTS_STORAGE_KEY = 'quiz-maker-results';

export const quizStorage = {
  getQuizzes: (): Quiz[] => {
    const storedQuizzes = localStorage.getItem(QUIZ_STORAGE_KEY);
    return storedQuizzes ? JSON.parse(storedQuizzes) : [];
  },

  saveQuiz: (quiz: Quiz): void => {
    const quizzes = quizStorage.getQuizzes();
    const existingQuizIndex = quizzes.findIndex((q) => q.id === quiz.id);

    if (existingQuizIndex > -1) {
      quizzes[existingQuizIndex] = quiz;
    } else {
      quizzes.push(quiz);
    }

    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizzes));
  },

  deleteQuiz: (quizId: string): void => {
    const quizzes = quizStorage.getQuizzes();
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updatedQuizzes));
  },
  
  getQuiz: (id: string): Quiz | null => {
    const quizzes = quizStorage.getQuizzes();
    return quizzes.find(quiz => quiz.id === id) || null;
  },

  saveResult: (result: QuizResult): void => {
    const results = quizStorage.getResults(result.quizId);
    results.push(result);
    localStorage.setItem(`${RESULTS_STORAGE_KEY}-${result.quizId}`, JSON.stringify(results));
  },

  getResults: (quizId: string): QuizResult[] => {
    const storedResults = localStorage.getItem(`${RESULTS_STORAGE_KEY}-${quizId}`);
    return storedResults ? JSON.parse(storedResults) : [];
  },
};
