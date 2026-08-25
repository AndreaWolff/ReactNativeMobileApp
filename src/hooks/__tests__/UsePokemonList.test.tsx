import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { usePokemonList } from '@/hooks/UsePokemonList';
import * as PokemonApi from '@/api/Pokemon';

jest.mock('@/api/Pokemon');

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });
}

describe('usePokemonList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = createQueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  function wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  it('returns results on success', async () => {
    (PokemonApi.getPokemonList as jest.Mock).mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    });

    const { result } = await renderHook(() => usePokemonList(20), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].name).toBe('bulbasaur');
  });

  it('exposes error state when the API fails', async () => {
    (PokemonApi.getPokemonList as jest.Mock).mockRejectedValue(
      new Error('Network request failed'),
    );

    const { result } = await renderHook(() => usePokemonList(20), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Network request failed');
  });
});