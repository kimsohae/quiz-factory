
import { Quiz, User, UserResult } from "@/types/quiz";
const RETRY_COUNT = 2;

async function fetchRetry(url: RequestInfo, init?: RequestInit, timeout = 10000) {
  let retry = RETRY_COUNT;
  while (retry > 0) {
    try {
      const response = await fetch(
        `${process.env.API_URL || process.env.NEXT_PUBLIC_ROOT_URL}/api${url}`,
        {
          method: "GET",
          ...init,
          signal: AbortSignal.timeout(timeout),
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        retry -= 1;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      return response;
    } catch (error) {
      console.error(`Fetch attemp failed`, error);
    }
    retry -= 1;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return null; // 최종 실패 시 null 반환
}

export async function fetchUserResult(user: string): Promise<UserResult> {
  const response = await fetchRetry(`/result/${user}`);

  if (!response) {
    throw new Error("Failed to fetch user result");
  }

  return response.json();
}

export async function updateUserResult(userId: string, userData: User) {
  const { score } = userData;
  const response = await fetchRetry(`/result/${userId}`, {
    method: "POST",
    body: JSON.stringify({
      score,
    }),
  });
  if (!response) {
    throw new Error("Failed to update user result");
  }
  return response.json();
}

export async function fetchResultAnalysis(userResult: UserResult, wrongQuizList:Quiz[]) {
  const { id: userId, score, rank } = userResult;
  // TODO: 10 -> 퀴즈리스트에서 전체 퀴즈 목록, 길이 읽어와 상수화
  const wrongAnswerString = '';
  wrongQuizList.forEach(() => {
    // wrongAnswerString += `&category=${getCategoryName(quiz.category)}`;
  })
  const response = await fetchRetry(`/analysis/${userId}?score=${score}&rank=${rank}${wrongAnswerString}`);
  if (!response) {
    throw new Error("Failed to fetch Analysis");
  }
  return response.json();
}
