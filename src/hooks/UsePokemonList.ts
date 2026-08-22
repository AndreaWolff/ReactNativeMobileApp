import { useCallback, useEffect, useState } from 'react';
import { getPokemonList } from '@/api/Pokemon';
import type { PokemonListItem } from '@/types/Pokemon';

export type PokemonListStatus = 'idle' | 'loading' | 'success' | 'error';

export function usePokemonList(limit = 20) {
    const [data, setData] = useState<PokemonListItem[]>([]);
    const [status, setStatus] = useState<PokemonListStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchList = useCallback(() => {
        const controller = new AbortController();
        setStatus('loading');
        setErrorMessage(null);

        getPokemonList({ limit, signal: controller.signal })
            .then((response) => {
                setData(response.results);
                setStatus('success');
            })
            .catch((error: unknown) => {
                if (controller.signal.aborted) return;
                setErrorMessage(error instanceof Error ? error.message : 'Failed to load Pokemon');
                setStatus('error');
            });

        return () => controller.abort();
    }, [limit]);

    useEffect (() => {
        return fetchList();
    }, [fetchList]);

    return {
        data,
        status,
        errorMessage,
        isLoading: status === 'loading' || status === 'idle',
        isError: status === 'error',
        refetch: fetchList,
    }
}