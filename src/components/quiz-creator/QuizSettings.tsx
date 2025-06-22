import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface QuizSettingsProps {
  theme: { primaryColor: string };
  shuffleQuestions: boolean;
  kakaoShareEnabled: boolean;
  onThemeChange: (theme: { primaryColor: string }) => void;
  onShuffleQuestionsChange: (shuffle: boolean) => void;
  onKakaoShareEnabledChange: (enabled: boolean) => void;
}

export const QuizSettings = ({
  theme,
  shuffleQuestions,
  kakaoShareEnabled,
  onThemeChange,
  onShuffleQuestionsChange,
  onKakaoShareEnabledChange,
}: QuizSettingsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>테마 색상</Label>
        <div className="flex gap-4 mt-2">
          <div>
            <Input
              id="primary-color"
              type="color"
              value={theme.primaryColor}
              onChange={(e) =>
                onThemeChange({ ...theme, primaryColor: e.target.value })
              }
              className="w-20 h-10"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="shuffle-questions">문제 순서 섞기</Label>
          <p className="text-sm text-muted-foreground">
            퀴즈를 풀 때마다 문제 순서를 랜덤하게 섞습니다
          </p>
        </div>
        <Switch
          id="shuffle-questions"
          checked={shuffleQuestions}
          onCheckedChange={onShuffleQuestionsChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="kakao-share">카카오톡 공유 버튼</Label>
          <p className="text-sm text-muted-foreground">
            퀴즈 결과 페이지에 카카오톡 공유 버튼을 표시합니다
          </p>
        </div>
        <Switch
          id="kakao-share"
          checked={kakaoShareEnabled}
          onCheckedChange={onKakaoShareEnabledChange}
        />
      </div> */}
    </div>
  );
};
