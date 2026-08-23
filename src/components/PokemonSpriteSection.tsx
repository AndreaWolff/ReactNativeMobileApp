import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PokemonSprite } from '@/components/PokemonSprite';
import type { PokemonSprites } from '@/types/Pokemon';

export type PokemonSpriteSectionProps = {
  /** Display name already formatted (e.g. "Charmander"). */
  name: string;
  sprites: PokemonSprites;
};

/**
 * Detail-screen sprite block: default / shiny with a toggle.
 * Owns local UI state so the screen stays thin.
 * Android analogy: a small composable with remember { mutableStateOf(false) }.
 */
export function PokemonSpriteSection({ name, sprites }: PokemonSpriteSectionProps) {
  const [shiny, setShiny] = useState(false);
  const hasShiny = Boolean(sprites.front_shiny);
  const uri = shiny && hasShiny ? sprites.front_shiny : sprites.front_default;
  const variantLabel = shiny && hasShiny ? 'shiny' : 'default';

  return (
    <View style={styles.wrap}>
      <PokemonSprite
        uri={uri}
        accessibilityLabel={`${name} ${variantLabel} sprite`}
      />

      {hasShiny ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={shiny ? 'Show default sprite' : 'Show shiny sprite'}
          accessibilityState={{ selected: shiny }}
          onPress={() => setShiny((prev) => !prev)}
          style={({ pressed }) => [styles.toggle, pressed && styles.togglePressed]}
        >
          <Text style={styles.toggleLabel}>{shiny ? 'Shiny' : 'Default'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  toggle: {
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  togglePressed: {
    opacity: 0.7,
  },
  toggleLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});