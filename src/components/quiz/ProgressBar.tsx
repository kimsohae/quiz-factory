"use client";
import { useUser } from "@/state/UserContext";
import { QuizTheme } from "@/types/quiz";
import { useParams, useRouter } from "next/navigation";

interface Props {
  isPreview?: boolean;
  quizLength: number;
  theme: QuizTheme;
}

export default function ProgressBar({
  isPreview,
  quizLength,
  theme: { primaryColor },
}: Props) {
  const {
    user: { progress },
    setUser,
  } = useUser();

  const { push } = useRouter();
  const { testId } = useParams<{ testId: string }>();
  const percentage = ((progress + 1) / quizLength) * 100;

  const handleClick = () => {
    if (!isPreview && progress - 1 < 0) {
      push(`/${testId}`);
    } else {
      const updateProgress = progress - 1 > 0 ? progress - 1 : 0;
      setUser({
        progress: updateProgress,
      });
    }
  };

  return (
    <div className="absolute top-4 w-full flex flex-row">
      <div onClick={handleClick}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-slate-300 hover:text-slate-500 w-[24px] h-[24px] mx-4 cursor-pointer`}
        >
          <path
            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="relative flex items-center w-full h-[24px]">
        <div className={"absolute w-full rounded-lg h-3 bg-slate-200"} />
        <div
          style={{ width: `${percentage}%`, backgroundColor: primaryColor }}
          className={`absolute rounded-lg h-3  transition-all`}
        />
      </div>
      <div className="h-[24px] mx-4 text-slate-300 text-xs flex items-center">
        {/* HINT */}
      </div>
    </div>
  );
}
