"use client";
import React, { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH(); // 초기실행
    window.addEventListener("resize", () => setVH());

    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <div className="bg-gray-50">
      <main
        style={{
          height: `calc(var(--vh, 1vh) * 100)`,
        }}
        id={"main"}
        className="relative max-w-[540px] m-auto bg-white flex flex-col items-center justify-center font-semibold text-gray-800 overflow-hidden z-[1] "
      >
        {children}
      </main>
    </div>
  );
}
