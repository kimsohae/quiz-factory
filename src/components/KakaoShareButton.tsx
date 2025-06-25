import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { Quiz, QuizResult } from "@/types/quiz";

// 카카오 SDK 타입 정의
declare global {
  interface Window {
    Kakao?: {
      Share: {
        sendDefault: (options: unknown) => void;
      };
    };
  }
}

interface KakaoShareButtonProps {
  quiz: Quiz;
  result: QuizResult;
}

export const KakaoShareButton = ({ quiz, result }: KakaoShareButtonProps) => {
  const handleKakaoShare = () => {
    const percentage = Math.round((result.score / quiz.questions.length) * 100);
    const currentUrl = window.location.href;

    // 카카오톡 공유하기 기능
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `${quiz.title} 퀴즈 결과`,
          description: `${quiz.questions.length}문항 중 ${result.score}개 정답! (정답률 ${percentage}%)`,
          imageUrl:
            "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png",
          link: {
            mobileWebUrl: currentUrl.replace(/\/[^\/]*$/, `/${quiz.id}`),
            webUrl: currentUrl.replace(/\/[^\/]*$/, `/${quiz.id}`),
          },
        },
        buttons: [
          {
            title: "퀴즈 도전하기",
            link: {
              mobileWebUrl: currentUrl.replace(/\/[^\/]*$/, `/${quiz.id}`),
              webUrl: currentUrl.replace(/\/[^\/]*$/, `/${quiz.id}`),
            },
          },
        ],
      });
    } else {
      // 카카오 SDK가 없는 경우 기본 공유
      const shareText = `${quiz.title} 퀴즈에서 ${quiz.questions.length}문항 중 ${result.score}개 정답! (정답률 ${percentage}%) 여러분도 도전해보세요!`;
      const shareUrl = currentUrl.replace(/\/[^\/]*$/, `/${quiz.id}`);

      if (navigator.share) {
        navigator.share({
          title: `${quiz.title} 퀴즈 결과`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert("링크가 클립보드에 복사되었습니다!");
      }
    }
  };

  return (
    <Button
      onClick={handleKakaoShare}
      className="gap-2"
      style={{ backgroundColor: "#FEE500", color: "#000" }}
    >
      <Share className="w-4 h-4" />
      카카오톡 공유하기
    </Button>
  );
};
