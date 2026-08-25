import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePokemonDetail } from '@/hooks/UsePokemonDetail';
import { formatName } from '@/components/PokemonListItem';
import { formatHeight, formatWeight } from '@/utils/PokemonFormat';
import { PokemonSpriteSection } from '@/components/PokemonSpriteSection';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';

export default function PokemonDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading, isError, errorMessage, refetch } = usePokemonDetail(id);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
                <LoadingState label="Loading Pokemon details…" />
            </SafeAreaView>
        )
    }

    if (isError || !data) {
        return (
            <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
                <ErrorState
                    title="Could not load Pokemon details"
                    message={errorMessage ?? 'Unknown error'}
                    onRetry={refetch}
                    retryAccessibilityLabel="Retry loading Pokemon details"
                />
            </SafeAreaView>
        )
    }

    // const spriteUrl = data.sprites.front_default;

    return (
        <>
            <Stack.Screen
                options={{
                    title: data ? formatName(data.name) : 'Pokemon',
                }}
            />
            {/* <SafeAreaView style={styles.safe} edges={['top', 'bottom']}> */}
            <ScrollView contentContainerStyle={styles.content}>
                <PokemonSpriteSection
                    name={formatName(data.name)}
                    sprites={data.sprites}
                />

                <Text style={styles.name}>{formatName(data.name)}</Text>
                <Text style={styles.id}>#{String(data.id).padStart(3, '0')}</Text>

                <View style={styles.row}>
                    {data.types.map((t) => (
                        <View key={t.type.name} style={styles.typeChip}>
                            <Text style={styles.typeText}>{formatName(t.type.name)}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Size</Text>
                    <Text style={styles.body}>Height: {formatHeight(data.height)}</Text>
                    <Text style={styles.body}>Weight: {formatWeight(data.weight)}</Text>
                    {data.base_experience != null && (
                        <Text style={styles.body}>Base EXP: {data.base_experience}</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Abilities</Text>
                    {data.abilities.map((a) => (
                        <Text key={a.ability.name} style={styles.body}>
                            {formatName(a.ability.name)}
                            {a.is_hidden ? ' (hidden)' : ''}
                        </Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Base stats</Text>
                    {data.stats.map((s) => (
                        <View key={s.stat.name} style={styles.statRow}>
                            <Text style={styles.statName}>{formatName(s.stat.name)}</Text>
                            <Text style={styles.statValue}>{s.base_stat}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            {/* </SafeAreaView> */}
        </>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
        paddingBottom: 32,
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 12,
    },
    statusText: {
        fontSize: 16,
        color: '#444',
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    errorBody: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    retry: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#222',
    },
    retryPressed: {
        opacity: 0.7,
    },
    retryLabel: {
        color: '#fff',
        fontWeight: '600',
    },
    // sprite: {
    //     width: 160,
    //     height: 160,
    //     marginBottom: 8,
    // },
    spritePlaceholder: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: '#999',
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
    },
    id: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    typeChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#eee',
    },
    typeText: {
        fontWeight: '600',
        fontSize: 14,
    },
    section: {
        alignSelf: 'stretch',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    body: {
        fontSize: 15,
        color: '#333',
        marginBottom: 4,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    statName: {
        fontSize: 15,
        color: '#444',
    },
    statValue: {
        fontSize: 15,
        fontWeight: '600',
    },
    spriteContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        // optional soft background
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        padding: 16,
    },
    sprite: {
        width: 180,
        height: 180,
    },
});