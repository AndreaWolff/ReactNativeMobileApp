import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { PokemonList } from '@/components/PokemonList';
import { usePokemonList } from '@/hooks/UsePokemonList';
import type { PokemonListItem } from '@/types/Pokemon';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';

function getPokemonIdFromUrl(url: string): string {
  const cleaned = url.endsWith('/') ? url.slice(0, -1) : url;
  const parts = cleaned.split('/');
  return parts[parts.length - 1] ?? '';
}

export default function IndexScreen() {
  const router = useRouter();
  const { data, isLoading, isError, errorMessage, refetch } = usePokemonList(20);

  const handleSelect = (pokemon: PokemonListItem) => {
    const id = getPokemonIdFromUrl(pokemon.url);
    router.push(`/pokemon/${id}`);
  };

  const shell = (body: React.ReactNode) => (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex</Text>
      </View>
      {body}
    </SafeAreaView>
  )

  if (isLoading) {
    return shell(<LoadingState label="Loading Pokemon…" />)
  }

  if (isError) {
    return shell(
      <ErrorState
        title="Could not load Pokemon"
        message={errorMessage ?? 'Unknown error'}
        onRetry={refetch}
        retryAccessibilityLabel="Retry loading Pokemon"
      />  
    )
  }

  return shell(
    <PokemonList data={data} onSelectPokemon={handleSelect} />
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