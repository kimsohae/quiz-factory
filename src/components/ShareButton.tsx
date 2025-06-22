"use client";
import { Button, ButtonProps } from "@/components/ui/button";

// const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "";
const initKakao = () => {
  // window.Kakao.init(KAKAO_JS_KEY);
};

export type ShareOptions = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
};

interface Props extends ButtonProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ShareButton({ title, imageUrl, ...props }: Props) {
  const onClickShare = () => {
    if (window.Kakao) {
      const shareUrl = window.location.href;
      const options: ShareOptions = {
        objectType: "feed",
        content: {
          title: "나의 경제머리 상태는?",
          description: title,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      };

      window.Kakao.Share.sendDefault(options);
    } else {
      console.error("window.Kakao not found");
    }
  };

  return (
    <>
      <div id="kakaotalk-sharing-btn"></div>
      <Button size="full" onClick={onClickShare} {...props}>
        카톡 공유
      </Button>
      {/* <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        onLoad={initKakao}
      /> */}
    </>
  );
}
