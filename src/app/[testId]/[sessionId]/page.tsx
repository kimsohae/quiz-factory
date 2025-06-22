import QuizResultComponent from "@/components/quiz/QuizResult";
import { supabaseQuizService } from "@/services/supabaseQuizService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

type Params = Promise<{
  testId: string;
  sessionId: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { testId, sessionId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["quizResult", testId, sessionId],
    queryFn: () => supabaseQuizService.getQuizResult(testId, sessionId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["quiz", testId],
    queryFn: () => supabaseQuizService.getQuiz(testId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Suspense fallback={<div>loading</div>}> */}
      <QuizResultComponent testId={testId} sessionId={sessionId} />
      {/* </Suspense> */}
    </HydrationBoundary>
  );
}
