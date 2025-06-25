"use client";
import { useId, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { QuizPreview } from "./QuizPreview";
import { Question, QuizForm, quizFormSchema } from "@/types/quiz";
import { useUser } from "@/state/UserContext";
import { QuizBasicInfo } from "./quiz-creator/QuizBasicInfo";
import { QuizSettings } from "./quiz-creator/QuizSettings";
import { AIQuizGenerator } from "./quiz-creator/AIQuizGenerator";
import { QuestionEditor } from "./quiz-creator/QuestionEditor";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { supabaseQuizService } from "@/services/supabaseQuizService";
import { toast } from "@/hooks/use-toast";

// interface QuizCreatorProps {
//   // quiz?: Quiz;
//   // onSave: (quiz: Quiz) => void;
//   // onCancel: () => void;
// }

const QUIZ_DEFAULT: QuizForm = {
  title: "",
  description: "",
  questions: [],
  theme: {
    primaryColor: "#21CA86",
  },
};

export const QuizCreator = () => {
  const {
    setUser,
    user: { progress },
  } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const { push } = useRouter();

  const form = useForm<QuizForm>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: QUIZ_DEFAULT,
  });

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = form;
  const watchedValues = watch();

  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      question: "",
      options: ["", ""],
      correctAnswer: 0,
      explanation: "",
    };
    const currentQuestions = watchedValues.questions || [];
    setValue("questions", [...currentQuestions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const newProgress = progress - 1 > 0 ? progress - 1 : 0;
    const currentQuestions = watchedValues.questions || [];
    setValue(
      "questions",
      currentQuestions.filter((_, i) => i !== index)
    );
    setUser({ progress: newProgress });
  };

  const handleQuestionsGenerated = (generatedQuestions: Question[]) => {
    const currentQuestions = watchedValues.questions || [];
    setValue("questions", [...currentQuestions, ...generatedQuestions]);
  };

  const onSubmit = async (data: QuizForm) => {
    // question 길이 0일때 에러 메시지 표기
    if (data.questions.length === 0) {
      setError("questions", {
        type: "min",
        message: "최소 1개의 문항이 필요합니다.",
      });
      return;
    }

    setIsSaving(true);
    const quizData: QuizForm = {
      title: data.title,
      description: data.description,
      // thumbnail: '', // 현재 Thumbnail 비활성화
      questions: data.questions,
      theme: {
        primaryColor: data.theme.primaryColor,
      },
    };
    try {
      let result;
      result = await supabaseQuizService.createQuiz(quizData);
      // }
      if (result.success) {
        toast({
          title: "퀴즈가 저장되었습니다!",
          description: "새로운 퀴즈가 생성되었습니다.",
          // description: quiz?.id
          //   ? "퀴즈가 성공적으로 업데이트되었습니다."
          //   : "새로운 퀴즈가 생성되었습니다.",
        });
        push("/");
        // onSave(quizData);
      } else {
        throw new Error(result.error || "저장 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "저장 실패",
        description: "퀴즈 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side - Quiz Creator */}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>퀴즈 정보</CardTitle>
                <CardDescription>
                  퀴즈의 기본 정보를 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuizBasicInfo control={control} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>퀴즈 설정</CardTitle>
                <CardDescription>
                  퀴즈의 테마와 옵션을 설정하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuizSettings control={control} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI 퀴즈 생성</CardTitle>
                <CardDescription>
                  AI를 활용해 자동으로 퀴즈를 생성해보세요 (Optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIQuizGenerator
                  onQuestionsGenerated={handleQuestionsGenerated}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                문항 ({(watchedValues.questions || []).length}개)
              </h2>
              {errors.questions && (
                <span className="text-destructive text-sm mt-1 font-medium">
                  {errors.questions.message}
                </span>
              )}
            </div>

            {(watchedValues.questions || []).map((q, questionIndex) => {
              return (
                <Card key={q.id}>
                  <QuestionEditor
                    control={control}
                    questionIndex={questionIndex}
                    onRemoveQuestion={removeQuestion}
                  />
                </Card>
              );
            })}

            <Button type="button" onClick={addQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              문항 추가
            </Button>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => push("/")}
                disabled={isSaving}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  "저장"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Right Side - Preview */}
        <div className="lg:sticky lg:top-6 lg:h-fit lg:col-span-2">
          <QuizPreview
            questions={watchedValues.questions}
            theme={{
              primaryColor: watchedValues.theme?.primaryColor || "#21CA86",
            }}
          />
        </div>
      </div>
    </div>
  );
};
