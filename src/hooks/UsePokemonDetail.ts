import { useQuery } from '@tanstack/react-query';

import { getPokemonDetail } from '@/api/Pokemon';

export function usePokemonDetail(idOrName: string | undefined) {
  const query = useQuery({
    queryKey: ['pokemon', 'detail', idOrName],
    queryFn: ({ signal }) => {
      // Guard is mainly for TypeScript; enabled already blocks the call
      if (!idOrName) {
        return Promise.reject(new Error('Missing Pokemon id'));
      }
      return getPokemonDetail({ idOrName, signal });
    },
    enabled: Boolean(idOrName),
  });

  return {
    data: query.data ?? null,
    status: query.status,
    errorMessage: !idOrName
      ? 'Missing Pokemon id'
      : query.error instanceof Error
        ? query.error.message
        : null,
    isLoading: Boolean(idOrName) && query.isPending,
    isError: !idOrName || query.isError,
    refetch: query.refetch,
  };
}