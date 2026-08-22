import { fireEvent, render, screen } from '@testing-library/react-native';

import { formatName, PokemonListItemRow } from '@/components/PokemonListItem';
import type { PokemonListItem } from '@/types/Pokemon';

const charmander: PokemonListItem = {
  name: 'charmander',
  url: 'https://pokeapi.co/api/v2/pokemon/4/',
};

describe('formatName', () => {
  it('capitalizes the first letter', () => {
    expect(formatName('pikachu')).toBe('Pikachu');
  });

  it('returns an empty string for empty input', () => {
    expect(formatName('')).toBe('');
  });
});

describe('PokemonListItemRow', () => {
  it('renders the pokemon name and id', async () => {
    await render(<PokemonListItemRow pokemon={charmander} />);

    expect(screen.getByText('Charmander')).toBeOnTheScreen();
    expect(screen.getByText('#4')).toBeOnTheScreen();
  });

  it('calls onPress with the pokemon when tapped', async () => {
    const onPress = jest.fn();
    await render(<PokemonListItemRow pokemon={charmander} onPress={onPress} />);

    await fireEvent.press(screen.getByLabelText('Pokemon charmander'));
    expect(onPress).toHaveBeenCalledWith(charmander);
  });
});