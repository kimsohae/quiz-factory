

import { generateRandomString } from '@/lib/utils';
import { Question } from '@/types/quiz';

// AI 퀴즈 생성을 위한 모의 서비스 (실제로는 OpenAI API 등을 사용)
export const generateQuizFromPrompt = async (
  prompt: string,
  questionCount: number = 5
): Promise<Question[]> => {
  // 실제 구현에서는 OpenAI API를 호출합니다
  // 여기서는 데모용 모의 데이터를 반환합니다

  const response = await fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  const answer = await response.json()

  const parsed = JSON.parse(answer.content);



if (parsed.questions &&  Array.isArray(parsed.questions)) {
    const parsedQuestions: Question[] = parsed.questions.map((q:Question, idx: number)=>({
    ...q,
    id: `${new Date().getTime()}${idx}`
    }));
    return parsedQuestions;
  } 


  return [];
};
