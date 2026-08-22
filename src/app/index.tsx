import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonList } from '@/components/PokemonList';
import { HARDCODED_POKEMON } from '@/data/HardcodedPokemon';
import type { PokemonListItem } from '@/types/Pokemon';

export default function IndexScreen() {
  const handleSelect = (pokemon: PokemonListItem) => {
    // Step 2: navigate to /pokemon/[id]
    console.log('selected', pokemon.name, pokemon.url)
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex</Text>
        <Text style={styles.subtitle}>Hardcoded List - API next</Text>
      </View>
      <PokemonList data={HARDCODED_POKEMON} onSelectPokemon={handleSelect} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#8E8E93',
  }
})