export const queryKeys = {
    quiz: {
      all: ['quiz'] as const,
      byId: (testId: string) => ['quiz', testId] as const,
    },
    quizResult: {
      bySession: (testId: string, sessionId: string) =>
        ['quizResult', testId, sessionId] as const,
    },
  } 
  