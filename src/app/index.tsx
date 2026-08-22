import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonList } from '@/components/PokemonList';
import { usePokemonList } from '@/hooks/UsePokemonList';
import type { PokemonListItem } from '@/types/Pokemon';

export default function IndexScreen() {
  const { data, isLoading, isError, errorMessage, refetch } = usePokemonList(20);

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

    {isLoading ? (
      <View style={styles.centered} accessibilityLabel="Loading Pokemon">
          <ActivityIndicator size="large" />
          <Text style={styles.statusText}>Loading Pokemon…</Text>
        </View>
    ) : isError ? (
      <View style={styles.centered}>
          <Text style={styles.errorTitle}>Could not load Pokemon</Text>
          <Text style={styles.errorBody}>{errorMessage ?? 'Unknown error'}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retry loading Pokemon"
            onPress={refetch}
            style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}
          >
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
        </View>
    ) : (
      <PokemonList data={data} onSelectPokemon={handleSelect} />
    )} 
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
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  statusText: { fontSize: 16, color: '#444' },
  errorTitle: { fontSize: 18, fontWeight: '600' },
  errorBody: { fontSize: 14, color: '#666', textAlign: 'center' },
  retry: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  retryPressed: { opacity: 0.7 },
  retryLabel: { color: '#fff', fontWeight: '600' },
})