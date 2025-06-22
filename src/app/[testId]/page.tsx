"use client";
import RoundedSquareWithEyesCanvas from "@/components/RoundedSquareWithEyesCanvas";
import { Button } from "@/components/ui/button";
import { useFetchQuiz } from "@/hooks/useFetchQuiz";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { data: quiz, isLoading } = useFetchQuiz();
  const { push } = useRouter();

  if (isLoading || !quiz) return <div>loading...</div>;

  return (
    <>
      <div className="relative w-full flex flex-col items-center mb-16">
        <div
          className={`font-moneygraphy text-5xl font-semibold flex flex-col items-center gap-4`}
        >
          <RoundedSquareWithEyesCanvas color={quiz.theme.primaryColor} />
          <div className="">{quiz.title}</div>
          <span className="block text-xl font-medium text-gray-400 mb-3 font-pretendard">
            {quiz.description}
          </span>
        </div>
      </div>

      <div className="absolute bottom-[30px] flex flex-col gap-4 items-center justify-center w-full">
        <span className="text-sm text-gray-400">MADE BY QUIZ FACTORY</span>
        <div className="w-full px-4">
          <Button
            className="w-full h-12 text-md rounded-xl"
            onClick={() => push(`/${quiz.id}/test`)}
            style={{ backgroundColor: quiz.theme.primaryColor }}
          >
            시작하기
          </Button>
        </div>
      </div>
    </>
  );
}
