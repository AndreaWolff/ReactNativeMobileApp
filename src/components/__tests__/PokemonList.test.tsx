import { render, screen } from '@testing-library/react-native';

import { PokemonList } from '@/components/PokemonList';
import type { PokemonListItem } from '@/types/Pokemon';

const data: PokemonListItem[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
];

describe('PokemonList', () => {
  it('renders each pokemon name', async () => {
    await render(<PokemonList data={data} />);

    expect(screen.getByText('Bulbasaur')).toBeOnTheScreen();
    expect(screen.getByText('Charmander')).toBeOnTheScreen();
  });

  it('shows an empty state when there is no data', async () => {
    await render(<PokemonList data={[]} />);

    expect(screen.getByText('No Pokemon yet')).toBeOnTheScreen();
  });
});