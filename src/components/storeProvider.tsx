"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../utils/services/store/store";
export default function StoreProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Provider store={store}>{children}</Provider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
