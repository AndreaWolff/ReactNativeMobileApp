import { act, renderHook, waitFor } from '@testing-library/react-native';

import { getPokemonList } from '@/api/Pokemon';
import { usePokemonList } from '@/hooks/UsePokemonList';

jest.mock('@/api/Pokemon', () => ({
  getPokemonList: jest.fn(),
}));

const mockGetPokemonList = getPokemonList as jest.MockedFunction<typeof getPokemonList>;

const sampleResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
};

describe('usePokemonList', () => {
  beforeEach(() => {
    mockGetPokemonList.mockReset();
  });

  it('loads list items on mount', async () => {
    mockGetPokemonList.mockResolvedValueOnce(sampleResponse);

    const { result } = await renderHook(() => usePokemonList());

    // Do NOT assert isLoading here — await renderHook often finishes after the mock resolved.
    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toEqual(sampleResponse.results);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.errorMessage).toBeNull();
    expect(mockGetPokemonList).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 20 }),
    );
  });

  it('passes a custom limit to the repository', async () => {
    mockGetPokemonList.mockResolvedValueOnce(sampleResponse);

    await renderHook(() => usePokemonList(5));

    await waitFor(() => {
      expect(mockGetPokemonList).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 5 }),
      );
    });
  });

  it('exposes an error message when the request fails', async () => {
    mockGetPokemonList.mockRejectedValueOnce(new Error('offline'));

    const { result } = await renderHook(() => usePokemonList());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.errorMessage).toBe('offline');
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('can retry after an error via refetch', async () => {
    mockGetPokemonList
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce(sampleResponse);

    const { result } = await renderHook(() => usePokemonList());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.isError).toBe(false);
  });
});