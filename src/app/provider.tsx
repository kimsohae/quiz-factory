"use client";
// import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/state/ThemeContext";
import { UserProvider } from "@/state/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
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
