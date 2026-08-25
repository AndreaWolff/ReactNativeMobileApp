import { useQuery } from '@tanstack/react-query';

import { getPokemonList } from '@/api/Pokemon';

export function usePokemonList(limit = 20) {
  const query = useQuery({
    queryKey: ['pokemon', 'list', { limit }],
    queryFn: ({ signal }) => getPokemonList({ limit, signal }),
  });

  return {
    data: query.data?.results ?? [],
    status: query.status,
    errorMessage: query.error instanceof Error ? query.error.message : null,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}