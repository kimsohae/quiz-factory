import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import QuizLayout from "./quiz/QuizLayout";
import { Question, QuizTheme } from "@/types/quiz";
import ProgressBar from "./quiz/ProgressBar";

interface QuizPreviewProps {
  questions: Question[];
  className?: string;
  theme: QuizTheme;
}

const QuizPreviewComponent = ({
  questions,
  className,
  theme,
}: QuizPreviewProps) => {
  if (questions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            미리보기
          </CardTitle>
          <CardDescription>
            문항을 추가하면 미리보기가 표시됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            미리보기를 보려면 최소 1개의 문항을 추가해주세요
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={` ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          미리보기
        </CardTitle>
        <CardDescription>
          {/* 실제 퀴즈 페이지와 동일하게 표시됩니다 */}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 미리보기 헤더 - 고정 높이 설정 */}
        <div className="relative h-[570px] rounded-lg overflow-hidden bg-white">
          <ProgressBar
            quizLength={questions.length}
            isPreview={true}
            theme={theme}
          />
          <QuizLayout questions={questions} isPreview={true} theme={theme} />
        </div>
      </CardContent>
    </Card>
  );
};

export const QuizPreview = memo(QuizPreviewComponent);
