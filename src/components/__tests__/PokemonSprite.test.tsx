import { render } from '@testing-library/react-native';

import { PokemonSprite } from '@/components/PokemonSprite';

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    Image: (props: { accessibilityLabel?: string }) =>
      React.createElement(View, {
        accessibilityLabel: props.accessibilityLabel,
        testID: 'expo-image',
      }),
  };
});

describe('PokemonSprite', () => {
  it('renders with accessibility label when uri is present', async () => {
    const { getByLabelText } = await render(
      <PokemonSprite
        uri="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        accessibilityLabel="Charmander sprite"
      />,
    );

    expect(getByLabelText('Charmander sprite')).toBeOnTheScreen();
  });

  it('still renders a labelled frame when uri is null', async () => {
    const { getByLabelText } = await render(
      <PokemonSprite uri={null} accessibilityLabel="Missing sprite" />,
    );

    expect(getByLabelText('Missing sprite')).toBeOnTheScreen();
  });

  it('uses default accessibility label when none is provided', async () => {
    const { getByLabelText } = await render(
      <PokemonSprite uri="https://example.com/sprite.png" />,
    );

    expect(getByLabelText('Pokemon sprite')).toBeOnTheScreen();
  });

  it('accepts a custom size without crashing', async () => {
    const { getByLabelText } = await render(
      <PokemonSprite
        uri="https://example.com/sprite.png"
        size={48}
        accessibilityLabel="Tiny sprite"
      />,
    );

    expect(getByLabelText('Tiny sprite')).toBeOnTheScreen();
  });
});