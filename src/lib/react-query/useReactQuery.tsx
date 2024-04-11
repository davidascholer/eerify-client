import { UseQueryOptions, useQuery } from "@tanstack/react-query";

/*
return options:
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isInitialLoading,
    isLoading,
    isLoadingError,
    isPaused,
    isPending,
    isPlaceholderData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    status,

    https://tanstack.com/query/v5/docs/framework/react/reference/useQuery
*/
const useReactQuery = (config: UseQueryOptions) => {
  return useQuery(config);
};

export default useReactQuery;
