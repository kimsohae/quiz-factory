import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Trash2 } from "lucide-react";
import { Question } from "@/types/quiz";
import { Trash2 } from "lucide-react";

interface QuestionEditorProps {
  question: Question;
  questionIndex: number;
  onUpdateQuestion: (
    index: number,
    field: keyof Question,
    value: unknown
  ) => void;
  onUpdateOption: (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => void;
  onUpdateOptionCount: (questionIndex: number, count: number) => void;
  onRemoveQuestion: (index: number) => void;
}

export const QuestionEditor = ({
  question,
  questionIndex,
  onUpdateQuestion,
  onUpdateOption,
  onUpdateOptionCount,
  onRemoveQuestion,
}: QuestionEditorProps) => {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">문항 {questionIndex + 1}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemoveQuestion(questionIndex)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>질문</Label>
          <Textarea
            value={question.question}
            onChange={(e) =>
              onUpdateQuestion(questionIndex, "question", e.target.value)
            }
            placeholder="질문을 입력하세요"
            rows={2}
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <Label>선택지 개수</Label>
            <Select
              value={question.options.length.toString()}
              onValueChange={(value) =>
                onUpdateOptionCount(questionIndex, parseInt(value))
              }
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2개</SelectItem>
                <SelectItem value="3">3개</SelectItem>
                <SelectItem value="4">4개</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>선택지</Label>
          <div className="space-y-2 mt-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${questionIndex}`}
                  checked={question.correctAnswer === optionIndex}
                  onChange={() =>
                    onUpdateQuestion(
                      questionIndex,
                      "correctAnswer",
                      optionIndex
                    )
                  }
                />
                <Input
                  value={option}
                  onChange={(e) =>
                    onUpdateOption(questionIndex, optionIndex, e.target.value)
                  }
                  placeholder={`선택지 ${optionIndex + 1}`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>해설</Label>
          <Textarea
            value={question.explanation || ""}
            onChange={(e) =>
              onUpdateQuestion(questionIndex, "explanation", e.target.value)
            }
            placeholder="정답에 대한 해설을 입력하세요"
            rows={2}
          />
        </div>
      </CardContent>
    </>
  );
};
