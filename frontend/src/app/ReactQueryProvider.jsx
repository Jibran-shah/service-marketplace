import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/queryCient";

export default function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}