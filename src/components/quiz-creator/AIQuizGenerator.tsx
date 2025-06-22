import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2 } from "lucide-react";
import { generateQuizFromPrompt } from "@/services/aiQuizGenerator";
import { toast } from "@/hooks/use-toast";
import { Question } from "@/types/quiz";

interface AIQuizGeneratorProps {
  onQuestionsGenerated: (questions: Question[]) => void;
}

export const AIQuizGenerator = ({
  onQuestionsGenerated,
}: AIQuizGeneratorProps) => {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFromAI = async () => {
    console.log("////");
    if (!aiPrompt.trim()) {
      // toast({
      //   title: "프롬프트를 입력해주세요",
      //   description: "AI가 퀴즈를 생성할 수 있도록 주제나 내용을 입력해주세요.",
      //   variant: "destructive",
      // });
      return;
    }
    console.log("sdfsdfdsf");

    setIsGenerating(true);
    try {
      const generatedQuestions = await generateQuizFromPrompt(aiPrompt);
      onQuestionsGenerated(generatedQuestions);
      setAiPrompt("");
      toast({
        title: "퀴즈가 생성되었습니다!",
        description: `${generatedQuestions.length}개의 문항이 추가되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "생성 실패",
        description: "퀴즈 생성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder="예: 한국사, 프로그래밍 기초, 영어 문법 등"
        className="flex-1"
      />
      <Button onClick={generateFromAI} disabled={isGenerating}>
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4" />
        )}
        생성
      </Button>
    </div>
  );
};
