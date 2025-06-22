import { Quiz } from "@/types/quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Edit, Trash2 } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  // onEdit: (quiz: Quiz) => void;
  // onDelete: (quizId: string) => void;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  // const navigate = useNavigate();

  const handlePlay = () => {
    window.open(`/${quiz.id}`, "_blank");
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Thumbnail */}
      <div className="h-32 relative">
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
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardDescription className="line-clamp-2">
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
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(quiz.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button> */}
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
