
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getPokemonIdFromUrl } from '@/data/HardcodedPokemon';
import type { PokemonListItem } from '@/types/Pokemon';

type Props = {
  pokemon: PokemonListItem;
  onPress?: (pokemon: PokemonListItem) => void;
};

export function PokemonListItemRow({ pokemon, onPress }: Props) {
  const id = getPokemonIdFromUrl(pokemon.url);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Pokemon ${pokemon.name}`}
      onPress={() => onPress?.(pokemon)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>#{id}</Text>
      </View>
      <Text style={styles.name}>{formatName(pokemon.name)}</Text>
    </Pressable>
  );
}

export function formatName(name: string): string {
  if (!name) {
    return '';
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    minWidth: 48,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3C3C43',
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
  },
});