import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, useFormContext } from "react-hook-form";
import { Quiz } from "@/types/quiz";

interface QuestionEditorProps {
  control: Control<Quiz>;
  questionIndex: number;
  onRemoveQuestion: (index: number) => void;
}

export const QuestionEditor = ({
  control,
  questionIndex,
  onRemoveQuestion,
}: QuestionEditorProps) => {
  const { setValue, watch } = useFormContext<Quiz>();
  const watchedQuestion = watch(`questions.${questionIndex}`);
  const currentOptions = watchedQuestion?.options || ["", ""];

  const updateOptionCount = (count: number) => {
    let newOptions = [...currentOptions];

    if (count > newOptions.length) {
      // Add empty options
      while (newOptions.length < count) {
        newOptions.push("");
      }
    } else if (count < newOptions.length) {
      // Remove options
      newOptions = newOptions.slice(0, count);
      // Adjust correct answer if it's beyond the new range
      if ((watchedQuestion?.correctAnswer || 0) >= count) {
        setValue(
          `questions.${questionIndex}.correctAnswer`,
          Math.max(0, count - 1)
        );
      }
    }

    setValue(`questions.${questionIndex}.options`, newOptions);
  };

  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">문항 {questionIndex + 1}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemoveQuestion(questionIndex)}
            type="button"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name={`questions.${questionIndex}.question`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>질문</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="질문을 입력하세요" rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <div>
            <Label>선택지 개수</Label>
            <Select
              value={currentOptions.length.toString()}
              onValueChange={(value) => updateOptionCount(parseInt(value))}
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
            {currentOptions.map((_, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.correctAnswer`}
                  render={({ field: correctField }) => (
                    <input
                      type="radio"
                      checked={correctField.value === optionIndex}
                      onChange={() => correctField.onChange(optionIndex)}
                    />
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.options.${optionIndex}`}
                  render={({ field: optionField }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...optionField}
                          placeholder={`선택지 ${optionIndex + 1}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={control}
          name={`questions.${questionIndex}.explanation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>해설</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="정답에 대한 해설을 입력하세요"
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
};
