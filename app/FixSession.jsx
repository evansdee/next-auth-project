"use client";
import SessionProvider from "@/util/SessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FixSession({ children, session }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // Unused data is kept in cache for 10 minutes
        retry: 2, // Retry failed queries 2 times
      
      },
      mutations: {
        retry: 0, // Retry failed mutations once
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>

    <SessionProvider session={session}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      {children}
    </SessionProvider>
    <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
  );
}
