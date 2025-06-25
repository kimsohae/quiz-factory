"use client";
import { useEffect } from "react";
import { initialUser, useUser } from "@/state/UserContext";
import QuizAnswer from "./QuizAnswer";
import { Question, QuizTheme } from "@/types/quiz";
export default function QuizLayout({
  questions,
  theme,
  isPreview,
}: {
  questions: Question[];
  isPreview?: boolean;
  theme: QuizTheme;
}) {
  const {
    user: { progress: currentIndex },
    setUser,
  } = useUser();
  const { primaryColor } = theme;
  const currentQuiz = questions[currentIndex];

  useEffect(() => {
    // celanup: 점수/진행도 초기화
    return () => setUser(initialUser);
  }, []);

  if (!currentQuiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <section className="flex flex-col items-center justify-start w-full h-full">
      <div className=" flex flex-col items-center  px-4 gap-4 pt-[4.5rem]">
        <div className="flex flex-col gap-2">
          <span
            className="text-xl font-bold text-center text-primary"
            style={{ color: primaryColor }}
          >
            Q{currentIndex + 1}
          </span>
          {/* <CategoryBadge category={currentQuiz.category} /> */}
        </div>
        <div className="flex flex-col items-center break-keep font-semibold">
          <div className="text-center text-gray-600 whitespace-pre-wrap ">
            <div className="text-gray-900">
              {currentQuiz.question || "질문을 입력하세요"}
            </div>
            {questions[currentIndex].context}
          </div>
        </div>
      </div>
      <QuizAnswer
        questions={questions}
        // currentQuiz={currentQuiz}
        // isLastQuiz={isLastQuiz}
        isPreview={isPreview}
        theme={theme}
      />
    </section>
  );
}
