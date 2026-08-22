import { getPokemonDetail, getPokemonList } from '@/api/Pokemon';
import { getJson } from '@/api/http';

jest.mock('@/api/http', () => ({
  getJson: jest.fn(),
}));

const mockGetJson = getJson as jest.MockedFunction<typeof getJson>;

describe('getPokemonList', () => {
  beforeEach(() => {
    mockGetJson.mockReset();
  });

  it('calls PokeAPI with limit and offset query params', async () => {
    mockGetJson.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    await getPokemonList({ limit: 20, offset: 0 });

    expect(mockGetJson).toHaveBeenCalledTimes(1);
    const calledUrl = mockGetJson.mock.calls[0][0];
    expect(calledUrl).toContain('https://pokeapi.co/api/v2/pokemon/');
    expect(calledUrl).toContain('limit=20');
    expect(calledUrl).toContain('offset=0');
  });
});

describe('getPokemonDetail', () => {
  beforeEach(() => {
    mockGetJson.mockReset();
  });

  it('calls PokeAPI with the given id', async () => {
    mockGetJson.mockResolvedValueOnce({
      id: 4,
      name: 'charmander',
      height: 6,
      weight: 85,
      base_experience: 62,
      types: [],
      abilities: [],
      stats: [],
      sprites: { front_default: null, front_shiny: null, back_default: null, back_shiny: null },
    });

    await getPokemonDetail({ idOrName: '4' });

    expect(mockGetJson).toHaveBeenCalledTimes(1);
    const calledUrl = mockGetJson.mock.calls[0][0];
    expect(calledUrl).toBe('https://pokeapi.co/api/v2/pokemon/4/');
  });

  it('accepts a name as well as an id', async () => {
    mockGetJson.mockResolvedValueOnce({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      types: [],
      abilities: [],
      stats: [],
      sprites: { front_default: null, front_shiny: null, back_default: null, back_shiny: null },
    });

    await getPokemonDetail({ idOrName: 'pikachu' });

    const calledUrl = mockGetJson.mock.calls[0][0];
    expect(calledUrl).toBe('https://pokeapi.co/api/v2/pokemon/pikachu/');
  });

  it('forwards an AbortSignal when provided', async () => {
    const controller = new AbortController();
    mockGetJson.mockResolvedValueOnce({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: [],
      abilities: [],
      stats: [],
      sprites: { front_default: null, front_shiny: null, back_default: null, back_shiny: null },
    });

    await getPokemonDetail({ idOrName: '1', signal: controller.signal });

    expect(mockGetJson).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1/',
      expect.objectContaining({ signal: controller.signal }),
    );
  });
});