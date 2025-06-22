"use client";
import ProgressBar from "@/components/quiz/ProgressBar";
import QuizLayout from "@/components/quiz/QuizLayout";
import { useFetchQuiz } from "@/hooks/useFetchQuiz";
import React from "react";

export default function Page() {
  const { data: quiz, isLoading } = useFetchQuiz();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Test not found</div>;
  }

  return (
    <>
      <ProgressBar
        quizLength={quiz.questions.length}
        isPreview={false}
        theme={quiz.theme}
      />
      <QuizLayout questions={quiz.questions} theme={quiz.theme} />
    </>
  );
}
