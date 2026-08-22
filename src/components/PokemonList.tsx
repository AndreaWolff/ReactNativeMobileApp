import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PokemonListItemRow } from '@/components/PokemonListItem';
import type { PokemonListItem } from '@/types/Pokemon';

type Props = {
  data: PokemonListItem[];
  onSelectPokemon?: (pokemon: PokemonListItem) => void;
};

export function PokemonList({ data, onSelectPokemon }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <PokemonListItemRow pokemon={item} onPress={onSelectPokemon} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.content}
      ListEmptyComponent={<Text style={styles.empty}>No Pokemon yet</Text>}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    color: '#8E8E93',
  },
});