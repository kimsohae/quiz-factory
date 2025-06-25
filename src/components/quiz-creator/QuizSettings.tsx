import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Quiz } from "@/types/quiz";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface QuizSettingsProps {
  control: Control<Quiz>;
}

export const QuizSettings = ({
  control,
}: // onShuffleQuestionsChange,
// onKakaoShareEnabledChange,
QuizSettingsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="theme.primaryColor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>테마 색상</FormLabel>
            <div className="flex gap-4 mt-2">
              <FormControl>
                <Input type="color" {...field} className="w-20 h-10" />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
        name="shuffleQuestions"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>문제 순서 섞기</FormLabel>
              <p className="text-sm text-muted-foreground">
                퀴즈를 풀 때마다 문제 순서를 랜덤하게 섞습니다
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="kakaoShareEnabled"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>카카오톡 공유 버튼</FormLabel>
              <p className="text-sm text-muted-foreground">
                퀴즈 결과 페이지에 카카오톡 공유 버튼을 표시합니다
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      /> */}
    </div>
  );
};
