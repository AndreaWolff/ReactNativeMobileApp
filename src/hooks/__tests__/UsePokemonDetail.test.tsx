import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { usePokemonDetail } from '@/hooks/UsePokemonDetail';
import * as PokemonApi from '@/api/Pokemon';
import type { PokemonDetail } from '@/types/Pokemon';

jest.mock('@/api/Pokemon');

const mockDetail: PokemonDetail = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  base_experience: 62,
  types: [
    { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } },
  ],
  abilities: [],
  stats: [],
  sprites: {
    front_default: 'https://example.com/default.png',
    front_shiny: 'https://example.com/shiny.png',
    back_default: null,
    back_shiny: null,
  },
};

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

describe('usePokemonDetail', () => {
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

  it('returns detail data on success', async () => {
    (PokemonApi.getPokemonDetail as jest.Mock).mockResolvedValue(mockDetail);

    const { result } = await renderHook(() => usePokemonDetail('4'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockDetail);
    expect(result.current.data?.name).toBe('charmander');
  });

  it('exposes error state when the API fails', async () => {
    (PokemonApi.getPokemonDetail as jest.Mock).mockRejectedValue(
      new Error('Network request failed'),
    );

    const { result } = await renderHook(() => usePokemonDetail('4'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Network request failed');
    expect(result.current.data).toBeNull();
  });

  it('does not fetch and reports error when id is missing', async () => {
    const { result } = await renderHook(() => usePokemonDetail(undefined), { wrapper });

    expect(PokemonApi.getPokemonDetail).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Missing Pokemon id');
    expect(result.current.data).toBeNull();
  });

  it('calls getPokemonDetail with the given id', async () => {
    (PokemonApi.getPokemonDetail as jest.Mock).mockResolvedValue(mockDetail);

    const { result } = await renderHook(() => usePokemonDetail('charmander'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(PokemonApi.getPokemonDetail).toHaveBeenCalledWith(
      expect.objectContaining({ idOrName: 'charmander' }),
    );
  });
});