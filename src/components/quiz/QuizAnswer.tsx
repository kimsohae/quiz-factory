"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/state/UserContext";
import { Question, QuizTheme } from "@/types/quiz";
import { cn, generateRandomString } from "@/lib/utils";
import { supabaseQuizService } from "@/services/supabaseQuizService";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import RoundedSquareWithEyesCanvas from "../RoundedSquareWithEyesCanvas";

interface Props {
  questions: Question[];
  // currentQuiz: Question;
  // isLastQuiz: boolean;
  isPreview?: boolean;
  theme: QuizTheme;
}

export default function QuizAnswer({
  questions,
  // currentQuiz,
  // isLastQuiz,
  isPreview,
  theme: { primaryColor },
}: Props) {
  const queryClient = useQueryClient();
  const {
    user: { progress },
    setUser,
  } = useUser();

  const { push } = useRouter();
  const { testId } = useParams<{ testId: string }>();
  const currentQuiz = questions[progress];
  const isLastQuiz = progress === questions.length - 1;
  const { options } = currentQuiz;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickOption = (option: string, idx: number) => {
    setSelectedIdx(idx);
  };

  const onClickSubmit = async () => {
    // preview인 경우 결과 제공 X
    if (isPreview && isLastQuiz) return;
    if (selectedIdx === null) return;
    // 선택지 초기화 후 다음 문제로 넘어간다
    // [1] 점수, 진행도 기록: 맞으면 득점

    const newProgress = progress + (isLastQuiz ? 0 : 1);

    const updatedUser = {
      // score: newScore,
      progress: newProgress,
    };

    console.log(selectedIds, selectedIdx);
    const updatedSelectedAnswers = [...selectedIds, selectedIdx];
    setUser(updatedUser);
    setSelectedIds(updatedSelectedAnswers);

    //  [2] 마지막 문항일 경우, 결과 페이지로 이동
    if (isLastQuiz) {
      const sessionId = generateRandomString();
      setIsLoading(true);
      // 결과 입력(POST 요청)
      const newScore = questions.reduce((prev, cur, idx) => {
        if (cur && updatedSelectedAnswers[idx] !== undefined) {
          return cur.correctAnswer === updatedSelectedAnswers[idx]
            ? prev + 1
            : prev;
        }
        return prev;
      }, 0);

      const newResult = {
        quizId: testId,
        answers: updatedSelectedAnswers,
        score: newScore,
        completedAt: new Date(),
      };
      await supabaseQuizService.saveQuizResult(newResult, sessionId);
      queryClient.setQueryData(["quizResult", testId, sessionId], newResult);
      setTimeout(() => {
        push(`/${testId}/${sessionId}`);
      }, 2000);
      return;
    }

    // [3] 선택 상태 초기화
    setSelectedIdx(null);
  };

  // commit test

  return (
    <>
      <div className="h-[70%] pt-8 pb-12 w-full overflow-y-auto px-8">
        <div className="flex flex-col gap-4 m-auto justify-center w-full items-center">
          {options.map((option, idx) => (
            <Button
              className={`relative w-full font-semibold text-md rounded-xl whitespace-normal break-words h-auto py-3`}
              variant={selectedIdx === idx ? "selected" : "outline"}
              style={{
                borderColor: selectedIdx === idx ? primaryColor : "",
              }}
              key={`${progress}_${idx}`}
              onClick={() => onClickOption(option, idx)}
            >
              {option || `선택지 ${idx + 1}`}
            </Button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center items-center bg-white pb-[30px] px-4">
        <Button
          className={cn(`w-full h-12 text-md rounded-xl`)}
          style={{
            backgroundColor: primaryColor,
          }}
          disabled={selectedIdx === null}
          onClick={onClickSubmit}
        >
          {isLastQuiz ? "결과보기" : "선택하기"}
        </Button>
      </div>

      <div
        className={`absolute transform-gpu ${isPreview ? "hidden" : ""} ${
          isLoading ? " translate-y-[0%] " : " translate-y-[100%]"
        }  left-0 w-full h-[100%] z-[10] bg-black/70 flex flex-col gap-4 items-center justify-center duration-300 ease-in-out text-white`}
      >
        <RoundedSquareWithEyesCanvas color={primaryColor} />
        {isLoading && <>잠시만 기다려 주세요</>}
      </div>
    </>
  );
}
