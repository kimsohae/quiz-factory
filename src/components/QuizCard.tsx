import { Quiz } from "@/types/quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  // onEdit: (quiz: Quiz) => void;
  url?: string;
  isPremium?: boolean;
  onDelete: (quizId: string) => void;
}

export const QuizCard = ({ quiz, url, isPremium, onDelete }: QuizCardProps) => {
  // const navigate = useNavigate();

  const handlePlay = () => {
    window.open(`${url ?? `/${quiz.id}`}`, "_blank");
  };

  return (
    <Card className=" hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Thumbnail */}

      <div
        className="h-32 relative hover:cursor-pointer"
        role={"button"}
        onClick={handlePlay}
      >
        {quiz.thumbnail ? (
          <img
            src={quiz.thumbnail}
            alt={quiz.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            style={{
              background: `linear-gradient(135deg, ${quiz.theme.primaryColor})`,
            }}
            className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
          >
            {quiz.title}
          </div>
        )}
        {isPremium && (
          <div className="absolute bottom-2 right-2 h-8 bg-white border-primary border-2 z-1 px-2 rounded-full text-primary font-bold">
            {" "}
            premium{" "}
          </div>
        )}
        <div className="absolute inset-0 bg-black/10 hover:bg-transparent"></div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardDescription className="line-clamp-2 font-semibold">
              {quiz.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(quiz.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handlePlay}
              style={{ backgroundColor: quiz.theme.primaryColor }}
            >
              <Play className="w-4 h-4 mr-2" />
              시작
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
