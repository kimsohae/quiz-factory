import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Provider from "./provider";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  // weight: ["300", "400", "600", "800", "900"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "QUIZ Factory",
  description: "퀴즈를 생성하고 공유해 보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKR.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
