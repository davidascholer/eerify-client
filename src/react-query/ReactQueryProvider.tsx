import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // changes everywhere useQuery is used. e.g.
      // refetchOnWindowFocus: false,
      // staleTime: 1000 * 60 * 5,
    },
  },
});

const ReactQueryContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryContainer;
