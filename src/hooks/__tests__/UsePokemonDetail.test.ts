import { act, renderHook, waitFor } from '@testing-library/react-native';

import { getPokemonDetail } from '@/api/Pokemon';
import { usePokemonDetail } from '@/hooks/UsePokemonDetail';
import type { PokemonDetail } from '@/types/Pokemon';

jest.mock('@/api/Pokemon', () => ({
  getPokemonDetail: jest.fn(),
}));

const mockGetPokemonDetail = getPokemonDetail as jest.MockedFunction<typeof getPokemonDetail>;

const sampleDetail: PokemonDetail = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  base_experience: 62,
  types: [
    { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } },
  ],
  abilities: [
    {
      is_hidden: false,
      slot: 1,
      ability: { name: 'blaze', url: 'https://pokeapi.co/api/v2/ability/66/' },
    },
  ],
  stats: [
    {
      base_stat: 39,
      effort: 0,
      stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
    },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    front_shiny: null,
    back_default: null,
    back_shiny: null,
  },
};

describe('usePokemonDetail', () => {
  beforeEach(() => {
    mockGetPokemonDetail.mockReset();
  });

  it('loads detail on mount when id is provided', async () => {
    mockGetPokemonDetail.mockResolvedValueOnce(sampleDetail);

    const { result } = await renderHook(() => usePokemonDetail('4'));

    // After await renderHook, the effect may already have completed
    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toEqual(sampleDetail);
    expect(result.current.isError).toBe(false);
    expect(mockGetPokemonDetail).toHaveBeenCalledWith(
      expect.objectContaining({ idOrName: '4' }),
    );
  });

  it('exposes an error and can retry', async () => {
    mockGetPokemonDetail.mockRejectedValueOnce(new Error('offline'));
    mockGetPokemonDetail.mockResolvedValueOnce(sampleDetail);

    const { result } = await renderHook(() => usePokemonDetail('4'));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.errorMessage).toBe('offline');

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data?.name).toBe('charmander');
  });

  it('sets an error when id is missing', async () => {
    const { result } = await renderHook(() => usePokemonDetail(undefined));

    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Missing Pokemon id');
    expect(result.current.isLoading).toBe(false);
    expect(mockGetPokemonDetail).not.toHaveBeenCalled();
  });
});