import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { PokemonSpriteSection } from '@/components/PokemonSpriteSection';
import type { PokemonSprites } from '@/types/Pokemon';
// If needed: import type { PokemonSprites } from '@/types/Pokemon';

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

const spritesBoth: PokemonSprites = {
    front_default: 'https://example.com/default.png',
    front_shiny: 'https://example.com/shiny.png',
    back_default: null,
    back_shiny: null,
};

const spritesNoShiny: PokemonSprites = {
    front_default: 'https://example.com/default.png',
    front_shiny: null,
    back_default: null,
    back_shiny: null,
};

describe('PokemonSpriteSection', () => {
    it('starts on the default sprite', async () => {
        const { getByLabelText } = await render(
            <PokemonSpriteSection name="Charmander" sprites={spritesBoth} />,
        );

        expect(getByLabelText('Charmander default sprite')).toBeOnTheScreen();
        expect(getByLabelText('Show shiny sprite')).toBeOnTheScreen();
    });

    it('toggles to shiny and back', async () => {
        const { getByLabelText } = await render(
            <PokemonSpriteSection name="Charmander" sprites={spritesBoth} />,
        );

        fireEvent.press(getByLabelText('Show shiny sprite'));

        await waitFor(() => {
            expect(getByLabelText('Charmander shiny sprite')).toBeOnTheScreen();
        });
        expect(getByLabelText('Show default sprite')).toBeOnTheScreen();

        fireEvent.press(getByLabelText('Show default sprite'));

        await waitFor(() => {
            expect(getByLabelText('Charmander default sprite')).toBeOnTheScreen();
        });
    });

    it('hides the toggle when there is no shiny sprite', async () => {
        const { getByLabelText, queryByLabelText } = await render(
            <PokemonSpriteSection name="Missingno" sprites={spritesNoShiny} />,
        );

        expect(getByLabelText('Missingno default sprite')).toBeOnTheScreen();
        expect(queryByLabelText('Show shiny sprite')).toBeNull();
        expect(queryByLabelText('Show default sprite')).toBeNull();
    });
});