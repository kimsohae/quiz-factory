"use client";
import { QuizTheme } from "@/types/quiz";
import React, { createContext, useContext, useState } from "react";

type ThemeContextType = {
  theme: QuizTheme;
  setTheme: (param: Partial<QuizTheme>) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const initialTheme: QuizTheme = {
  font: "Noto Sans",
  primaryColor: "#21CA86",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeInfo] = useState(initialTheme);

  const setTheme = (param: Partial<QuizTheme>) => {
    setThemeInfo((prev) => ({ ...prev, ...param }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
