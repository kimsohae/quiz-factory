"use client";
import { useFetchQuiz, useFetchQuizResult } from "@/hooks/useFetchQuiz";
import { Question } from "@/types/quiz";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  testId: string;
  sessionId: string;
}
export default function QuizResultComponent({ testId, sessionId }: Props) {
  const {
    data: quizResult,
    isLoading,
    isError,
  } = useFetchQuizResult(testId, sessionId);
  const {
    data: quiz,
    isLoading: isLoadingQuiz,
    isError: isQuizError,
  } = useFetchQuiz();

  if (isLoading || isLoadingQuiz) return <div>Loading..!?.</div>;
  if (isError || isQuizError || !quiz || !quizResult)
    return <div>Not found</div>;

  const { theme, title, questions } = quiz;
  const { primaryColor } = theme;
  const quizLength = questions.length || 0;
  const wrongAnswers = quiz.questions.filter(
    (question, idx) => question.correctAnswer !== quizResult.answers[idx]
  );
  return (
    <section className="h-full overflow-y-auto w-full">
      <div className="text-md mt-4 h-fit w-full text-center">{title}</div>
      <div className="pt-12 pb-8">
        <div className="flex flex-col items-center ">
          <div className="text-gray-500 text-lg text-center whitespace-pre-line"></div>
          <div className="text-gray-500 text-sm px-6 py-1 border border-gray-200 rounded-3xl">
            정답{" "}
            <span style={{ color: primaryColor }}>{quizResult.score}개</span>
          </div>
          <div className="text-center mt-6 mb-6">
            <span>
              {quizLength}문제 중 {quizResult.score}문제를 맞혔어요.{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <span className="ml-6 text-lg">오답 노트</span>
        <div className="border border-gray-200 rounded-3xl p-4 mx-4 mt-2 mb-28 w-auto">
          <div className="flex flex-col gap-8 w-full">
            {quizResult.score === quizLength ? (
              <div className="h-60 flex flex-col items-center justify-center gap-4 text-gray-500">
                <span className="">틀린 문제가 없어요 👏</span>
              </div>
            ) : (
              wrongAnswers.map((q: Question, index: number) => {
                const { explanation, options, question, correctAnswer } = q;

                return (
                  <div key={index}>
                    <div className="break-keep">
                      {index + 1}. {question}{" "}
                    </div>

                    <div className="break-keep my-1">
                      <span style={{ color: primaryColor }}>
                        → {options[correctAnswer]}
                      </span>
                    </div>

                    <div className="text-gray-400 text-sm">{explanation}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center items-center bg-white pb-[30px] px-4">
        <div className="w-full flex flex-row gap-[4px] mt-3">
          <Link href={`/${testId}`} className="w-full">
            <Button size="full" className="text-black" variant={"outline"}>
              다시 하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
