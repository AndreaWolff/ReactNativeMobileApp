const DEFAULT_TIMEOUT_MS = 10_000;

export class ApiError extends Error {
    readonly status: number | undefined;
    readonly url: string;

    constructor(
        message: string,
        options: {
            status?: number;
            url: string;
            cause?: unknown
        }) {
        super(message, { cause: options.cause });
        this.name = 'ApiError';
        this.status = options.status;
        this.url = options.url;
    }
}

type GetJsonOptions = {
    signal?: AbortSignal;
    timeoutMs?: number;
}

export async function getJson<T>(url: string, options?: GetJsonOptions): Promise<T> {
    const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const onExternalAbort = () => controller.abort();
    options?.signal?.addEventListener('abort', onExternalAbort);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new ApiError(`Request failed with status ${response.status}`, {
                status: response.status,
                url,
            });
        }

        return (await response.json()) as T;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiError('Request timed out or was cancelled', { url, cause: error });
        }
        throw new ApiError('Network request failed', { url, cause: error });
    } finally {
        clearTimeout(timeoutId);
        options?.signal?.removeEventListener('abort', onExternalAbort);
    }
}