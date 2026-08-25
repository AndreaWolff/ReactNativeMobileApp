import { useState } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 2,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Pokedex' }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{ title: 'Pokemon', headerBackTitle: 'Back' }}
        />
      </Stack>
    </QueryClientProvider>
  );
}