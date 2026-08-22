import type { PokemonDetail, PokemonListResponse } from '@/types/Pokemon';
import { getJson } from '@/api/http';

export const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2';

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

export function getPokemonDetailUrl(idOrName: string): string {
  return `${POKEMON_BASE_URL}/pokemon/${idOrName}/`;
}

export type GetPokemonDetailParams = {
  idOrName: string;
  signal?: AbortSignal;
};

/**
 * Repository: detail fetch. Screens/hooks never call fetch directly.
 */
export function getPokemonDetail(
  params: GetPokemonDetailParams,
): Promise<PokemonDetail> {
  const url = getPokemonDetailUrl(params.idOrName);
  return getJson<PokemonDetail>(url, { signal: params.signal });
}