import QuizResultComponent from "@/components/quiz/QuizResult";
import { getQueryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKey";
import { supabaseQuizService } from "@/services/supabaseQuizService";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Params = Promise<{
  testId: string;
  sessionId: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { testId, sessionId } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: queryKeys.quizResult.bySession(testId, sessionId),
    queryFn: () => supabaseQuizService.getQuizResult(testId, sessionId),
  });
  queryClient.prefetchQuery({
    queryKey: queryKeys.quiz.byId(testId),
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
