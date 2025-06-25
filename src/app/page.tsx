import Quizzes from "@/components/Quizzes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gray-100 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col justify-center items-center">
            <Image
              width={160}
              height={160}
              alt="logo"
              src="/title_logo.webp"
              className="w-40 h-40 animate-[float_3s_infinite_ease-in-out]"
            />
            {/* <BookOpen className="w-16 h-16 mx-auto mb-6" /> */}
            <h1 className="text-5xl font-extrabold mb-4 text-primary">
              QUIZ Factory
            </h1>
            <p className="text-lg mb-8 text-gray-700 font-semibold">
              손쉽게 퀴즈를 만들고 공유해 보세요.
            </p>
            <Link href={"/create"}>
              <Button size="lg" className="text-lg text-white mt-4 font-bold ">
                <Plus className="w-5 h-5 mr-2 stroke-[3.5]" />
                퀴즈 만들기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Quizzes />
    </div>
  );
}
