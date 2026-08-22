import { getJson } from '@/api/http';
import { getPokemonList } from '@/api/Pokemon';

jest.mock('@/api/http', () => ({
  getJson: jest.fn(),
}));

const mockGetJson = getJson as jest.MockedFunction<typeof getJson>;

const emptyResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

describe('getPokemonList', () => {
  beforeEach(() => {
    mockGetJson.mockReset();
    mockGetJson.mockResolvedValue(emptyResponse);
  });

  it('calls PokeAPI with default limit and offset', async () => {
    await getPokemonList();

    expect(mockGetJson).toHaveBeenCalledTimes(1);
    const calledUrl = String(mockGetJson.mock.calls[0][0]);

    expect(calledUrl).toContain('https://pokeapi.co/api/v2');
    expect(calledUrl).toContain('pokemon');
    expect(calledUrl).toContain('limit=20');
    expect(calledUrl).toContain('offset=0');
  });

  it('passes custom limit and offset as query params', async () => {
    await getPokemonList({ limit: 10, offset: 40 });

    const calledUrl = String(mockGetJson.mock.calls[0][0]);
    expect(calledUrl).toContain('limit=10');
    expect(calledUrl).toContain('offset=40');
  });

  it('forwards the AbortSignal to getJson', async () => {
    const controller = new AbortController();
    await getPokemonList({ signal: controller.signal });

    expect(mockGetJson).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal: controller.signal }),
    );
  });

  it('returns the response from getJson', async () => {
    const payload = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
    };
    mockGetJson.mockResolvedValueOnce(payload);

    await expect(getPokemonList()).resolves.toEqual(payload);
  });
});