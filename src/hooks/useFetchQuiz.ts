'use client';
import { supabaseQuizService } from "@/services/supabaseQuizService";
import {  useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useFetchQuiz = () => {
    const { testId } = useParams<{ testId: string }>();
    const { data, isLoading,isError,  refetch } = useQuery({
    //   getNextPageParam: (lastPage: BookResp) => {
    //     return lastPage.nextPage;
    //   },
      queryKey: ['quiz', testId],
      queryFn: () => supabaseQuizService.getQuiz(testId),
      enabled: !!testId,
    });
  
    return { data, isLoading, isError, refetch };
  };


  export const useFetchQuizList = () => {
    const { data, isLoading, isError, refetch } = useQuery({
    //   initialPageParam: 1,
    //   getNextPageParam: (lastPage: BookResp) => {
    //     return lastPage.nextPage;
    //   },
      queryKey: ['quizList'],
      queryFn: () => supabaseQuizService.getAllQuizzes(),
    });
  
  
    return { data, isLoading, isError, refetch};
  };

  export const useFetchQuizResult = (testId: string, sessionId: string) => {
    const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['quizResult', testId, sessionId],
      queryFn: () => supabaseQuizService.getQuizResult(testId, sessionId),
      enabled: !!(testId && sessionId),
    });

  
    return { data, isLoading, isError, refetch };
  };