import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface QuizBasicInfoProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

export const QuizBasicInfo = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: QuizBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">퀴즈 제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="퀴즈 제목을 입력하세요"
        />
      </div>
      <div>
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="퀴즈에 대한 설명을 입력하세요"
          rows={3}
        />
      </div>
    </div>
  );
};
