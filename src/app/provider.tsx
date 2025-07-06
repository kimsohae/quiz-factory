"use client";
import { getQueryClient } from "@/lib/react-query/queryClient";
import { ThemeProvider } from "@/state/ThemeContext";
import { UserProvider } from "@/state/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          {children}
          {/* <Toaster /> */}
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
