const MINUTE = 1000 * 60;

export const queryConfig = {
  staleTime: 5 * MINUTE,
  gcTime: 10 * MINUTE,

  retry: (failureCount) => {
    return failureCount < 2;
  },

  refetchOnWindowFocus: false,

  refetchOnReconnect: true,
  refetchOnMount: true
};