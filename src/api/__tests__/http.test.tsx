import { ApiError, getJson } from '@/api/http';

describe('getJson', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns parsed JSON on 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ hello: 'world' }),
    });

    const data = await getJson<{ hello: string }>('https://example.com/api');

    expect(data).toEqual({ hello: 'world' });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.com/api',
      expect.objectContaining({
        method: 'GET',
        headers: { Accept: 'application/json' },
      }),
    );
  });

  it('throws ApiError when response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    await expect(getJson('https://example.com/missing')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      message: 'Request failed with status 404',
    });
  });

  it('throws ApiError on network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Network request failed'));

    await expect(getJson('https://example.com/down')).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Network request failed',
    });
  });
});

describe('ApiError', () => {
  it('stores status and url', () => {
    const error = new ApiError('boom', { status: 500, url: 'https://example.com' });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ApiError');
    expect(error.status).toBe(500);
    expect(error.url).toBe('https://example.com');
    expect(error.message).toBe('boom');
  });
});