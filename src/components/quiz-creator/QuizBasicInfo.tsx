import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Quiz } from "@/types/quiz";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface QuizBasicInfoProps {
  control: Control<Quiz>;
}

export const QuizBasicInfo = ({ control }: QuizBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>퀴즈 제목</FormLabel>
            <FormControl>
              <Input {...field} placeholder="퀴즈 제목을 입력하세요" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>설명</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="퀴즈에 대한 설명을 입력하세요"
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
