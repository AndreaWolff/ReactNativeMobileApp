import type { PokemonListResponse } from '@/types/Pokemon';
import { getJson } from '@/api/http';

export const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/';

export type GetPokemonListParams = {
    limit?: number;
    offset?: number;
    signal?: AbortSignal;
}

export function getPokemonList(
    params: GetPokemonListParams = {},
): Promise<PokemonListResponse> {
    const limit = params.limit ?? 20;
    const offset = params.offset ?? 0;

    const url = new URL(`${POKEMON_BASE_URL}/pokemon/`);
    url.searchParams.set('limit', String(limit)); 
    url.searchParams.set('offset', String(offset));

    return getJson<PokemonListResponse>(url.toString(), { signal: params.signal });
}