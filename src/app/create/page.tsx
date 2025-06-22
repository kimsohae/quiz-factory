import GNB from "@/components/GNB";
import { QuizCreator } from "@/components/QuizCreator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <GNB />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <div>
              <div className="flex flex-row items-center ">
                <Link href={"/"}>
                  <ArrowLeft className="w-6 h-6 mr-2 hover:cursor-pointer text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold">새 퀴즈 만들기</h1>
              </div>
            </div>
          </div>
          <QuizCreator />
        </div>
      </div>
    </>
  );
}
