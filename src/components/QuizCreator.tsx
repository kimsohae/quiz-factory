"use client";
import { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { QuizPreview } from "./QuizPreview";
import { Question, Quiz } from "@/types/quiz";
import { useUser } from "@/state/UserContext";
import { supabaseQuizService } from "@/services/supabaseQuizService";
import { QuizBasicInfo } from "./quiz-creator/QuizBasicInfo";
import { QuizSettings } from "./quiz-creator/QuizSettings";
import { AIQuizGenerator } from "./quiz-creator/AIQuizGenerator";
import { QuestionEditor } from "./quiz-creator/QuestionEditor";
import { useRouter } from "next/navigation";

interface QuizCreatorProps {
  // quiz?: Quiz;
  // onSave: (quiz: Quiz) => void;
  // onCancel: () => void;
}

export const QuizCreator = ({}: QuizCreatorProps) => {
  const {
    setUser,
    user: { progress },
  } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [theme, setTheme] = useState({
    primaryColor: "#21CA86",
  });
  const [kakaoShareEnabled, setKakaoShareEnabled] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { push } = useRouter();

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", ""],
      correctAnswer: 0,
      explanation: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const updateOptionCount = (questionIndex: number, count: number) => {
    const updated = [...questions];
    const currentOptions = updated[questionIndex].options;

    if (count > currentOptions.length) {
      // Add empty options
      const newOptions = [...currentOptions];
      while (newOptions.length < count) {
        newOptions.push("");
      }
      updated[questionIndex].options = newOptions;
    } else if (count < currentOptions.length) {
      // Remove options
      updated[questionIndex].options = currentOptions.slice(0, count);
      // Adjust correct answer if it's beyond the new range
      if (updated[questionIndex].correctAnswer >= count) {
        updated[questionIndex].correctAnswer = Math.max(0, count - 1);
      }
    }

    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    const newProgress = progress - 1 > 0 ? progress - 1 : 0;
    setQuestions(questions.filter((_, i) => i !== index));
    setUser({ progress: newProgress });
  };

  const handleQuestionsGenerated = (generatedQuestions: Question[]) => {
    setQuestions([...questions, ...generatedQuestions]);
  };

  const handleSave = useCallback(async () => {
    console.log(1);
    console.log(1);
    console.log(title);
    if (!title.trim()) {
      console.log("엥");
      toast({
        title: "제목을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      console.log("엥2");
      toast({
        title: "최소 1개의 문항을 추가해주세요",
        variant: "destructive",
      });
      return;
    }

    console.log(2);
    setIsSaving(true);

    console.log(3);
    const quizData: Quiz = {
      id: Date.now().toString(),
      title,
      description,
      thumbnail,
      questions,
      theme,
      kakaoShareEnabled,
      shuffleQuestions,
      createdAt: new Date(),
    };

    console.log("heyehy");
    console.log(4);

    try {
      let result;

      console.log(quizData);
      // if (quiz?.id) {
      // Update existing quiz
      // result = await supabaseQuizService.updateQuiz(quizData);
      // } else {
      // Create new quiz
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
        description: error.message || "퀴즈 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [title, questions]);

  // Create preview quiz data
  const previewQuiz: Quiz = {
    id: "preview",
    title,
    description,
    thumbnail,
    questions,
    theme,
    createdAt: new Date(),
    shuffleQuestions,
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Side - Quiz Creator */}
        <div className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>퀴즈 정보</CardTitle>
              <CardDescription>퀴즈의 기본 정보를 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent>
              <QuizBasicInfo
                title={title}
                description={description}
                onTitleChange={setTitle}
                onDescriptionChange={setDescription}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>퀴즈 설정</CardTitle>
              <CardDescription>퀴즈의 테마와 옵션을 설정하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <QuizSettings
                theme={theme}
                shuffleQuestions={shuffleQuestions}
                kakaoShareEnabled={kakaoShareEnabled}
                onThemeChange={setTheme}
                onShuffleQuestionsChange={setShuffleQuestions}
                onKakaoShareEnabledChange={setKakaoShareEnabled}
              />
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
            <h2 className="text-2xl font-bold">문항 ({questions.length}개)</h2>
          </div>

          {questions.map((q, questionIndex) => (
            <Card key={q.id}>
              <QuestionEditor
                question={q}
                questionIndex={questionIndex}
                onUpdateQuestion={updateQuestion}
                onUpdateOption={updateOption}
                onUpdateOptionCount={updateOptionCount}
                onRemoveQuestion={removeQuestion}
              />
            </Card>
          ))}

          <Button onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-2" />
            문항 추가
          </Button>

          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => push("/")}
              disabled={isSaving}
            >
              취소
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
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
        </div>

        {/* Right Side - Preview */}
        <div className="lg:sticky lg:top-6 lg:h-fit lg:col-span-2">
          <QuizPreview questions={questions} theme={theme} />
        </div>
      </div>
    </div>
  );
};
