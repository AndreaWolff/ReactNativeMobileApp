import type { ComponentType } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/navigation/QueryClient';

export function withProviders<P extends object>(Screen: ComponentType<P>) {
    return function ProviderScreen(props: P) {
        return (
            <QueryClientProvider client={queryClient}>
                <Screen {...props}/>
            </QueryClientProvider>
        );
    };
}