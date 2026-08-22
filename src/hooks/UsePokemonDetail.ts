import { useCallback, useEffect, useState } from 'react';

import { getPokemonDetail } from '@/api/Pokemon';
import type { PokemonDetail } from '@/types/Pokemon';

export type PokemonDetailStatus = 'idle' | 'loading' | 'success' | 'error';

export type UsePokemonDetailResult = {
  data: PokemonDetail | null;
  status: PokemonDetailStatus;
  errorMessage: string | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export function usePokemonDetail(idOrName: string | undefined): UsePokemonDetailResult {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [status, setStatus] = useState<PokemonDetailStatus>(() =>
    idOrName ? 'idle' : 'error',
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    idOrName ? null : 'Missing Pokemon id',
  );

  const fetchDetail = useCallback(() => {
    if (!idOrName) {
      setData(null);
      setStatus('error');
      setErrorMessage('Missing Pokemon id');
      return () => {};
    }

    const controller = new AbortController();

    setStatus('loading');
    setErrorMessage(null);

    getPokemonDetail({ idOrName, signal: controller.signal })
      .then((response) => {
        setData(response);
        setStatus('success');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Failed to load Pokemon';
        setErrorMessage(message);
        setStatus('error');
      });

    return () => controller.abort();
  }, [idOrName]);

  useEffect(() => {
    return fetchDetail();
  }, [fetchDetail]);

  // Public refetch must be () => void (do not expose the effect cleanup)
  const refetch = useCallback(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    data,
    status,
    errorMessage,
    isLoading: status === 'loading' || status === 'idle',
    isError: status === 'error',
    refetch,
  };
}