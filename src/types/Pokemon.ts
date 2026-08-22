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

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  // many more optional nested fields exist; we only need the common ones for now
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  base_experience: number | null;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
};