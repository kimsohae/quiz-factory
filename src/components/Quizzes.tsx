"use client";

import { useFetchQuizList } from "@/hooks/useFetchQuiz";
import { supabaseQuizService } from "@/services/supabaseQuizService";
import { Quiz } from "@/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { BookOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { QuizCard } from "./QuizCard";
import { Button } from "./ui/button";

const ECONOMIC_MURY: { quiz: Quiz; url: string } = {
  quiz: {
    id: "economic-mury",
    title: "경제머리 테스트",
    description: "나의 경제머리 상태는...?",
    thumbnail: "https://economic-mury.site/img/OG.png", // 썸네일 URL 추가
    questions: [],
    theme: {
      primaryColor: "",
    },
    createdAt: new Date(2025, 3, 23),
    createdBy: "",
    kakaoShareEnabled: true,
    shuffleQuestions: false, // 문제 순서 섞기 옵션 추가
    // questionCount: 10, // 퀴즈 목록에서 문제 개수 표시용
  },
  url: "https://economic-mury.site",
};

export default function Quizzes() {
  const { data: quizzes, isLoading, refetch } = useFetchQuizList();
  // const { mutate: handleDelete } = useMutation({
  const { mutate: handleDelete } = useMutation({
    mutationFn: (quizId: string) => supabaseQuizService.deleteQuiz(quizId),
    onMutate: () => {
      refetch();
    },
  });
  const { push } = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">퀴즈 목록</h2>
      </div>

      {isLoading || !quizzes ? (
        <>Loading...</>
      ) : (
        <>
          {quizzes.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                아직 퀴즈가 없습니다
              </h3>
              <p className="text-muted-foreground mb-8">
                첫 번째 퀴즈를 만들어보세요!
              </p>
              <Button onClick={() => push("/create")}>
                <Plus className="w-4 h-4 mr-2" />
                퀴즈 만들기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuizCard
                quiz={ECONOMIC_MURY.quiz}
                url={ECONOMIC_MURY.url}
                isPremium={true}
                //   onEdit={handleEditQuiz}
                onDelete={handleDelete}
              />
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  //   onEdit={handleEditQuiz}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
