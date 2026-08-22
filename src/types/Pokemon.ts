/**
 * Matches GET https://pokeapi.co/api/v2/pokemon/ results[].
 * Keep this stable so the list UI does not change when you switch off hardcoded data.
 */
export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};