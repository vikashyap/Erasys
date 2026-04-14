import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  fetchUserPictures,
  fetchJson,
  getPictureUrl,
  getProfileUrl,
  PICTURE_BASE_URL,
  REMOTE_PROFILE_BASE_URL,
  normalizeUserPictures,
  type RemoteProfile,
} from '../src/index';

const remoteProfile: RemoteProfile = {
  name: 'msescortplus',
  preview_pic: {
    id: 'hero',
    url_token: 'abc123',
    width: 300,
    height: 400,
  },
  pictures: [
    {
      id: 'duplicateToken',
      url_token: 'abc123',
      width: 300,
      height: 400,
    },
    {
      id: 'gallery',
      url_token: 'def456',
      width: 800,
      height: 600,
    },
  ],
};

const readHeaders = (headers: RequestInit['headers']) => {
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  return Object.fromEntries(
    Object.entries(headers ?? {}).map(([key, value]) => [key.toLowerCase(), value]),
  );
};

describe('pictures', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates picture urls from tokens', () => {
    expect(getPictureUrl('abc123')).toBe(`${PICTURE_BASE_URL}/abc123.jpg`);
  });

  it('normalizes and deduplicates remote pictures', () => {
    const pictures = normalizeUserPictures(remoteProfile);

    expect(pictures).toHaveLength(2);
    expect(pictures[0]?.alt).toBe('msescortplus picture 1');
    expect(pictures[1]?.src).toBe(`${PICTURE_BASE_URL}/def456.jpg`);
  });

  it('fetches user pictures from a configurable endpoint', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(remoteProfile), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }),
    );

    const pictures = await fetchUserPictures({
      endpoint: '/api/profile/msescortplus',
      init: {
        cache: 'no-store',
      },
    });

    const [url, init] = fetchMock.mock.calls[0] ?? [];

    expect(url).toBe('/api/profile/msescortplus');
    expect(init?.cache).toBe('no-store');
    expect(readHeaders(init?.headers).accept).toBe('application/json');
    expect(pictures).toHaveLength(2);
  });

  it('uses the default slug when no options are passed', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(remoteProfile), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }),
    );

    await fetchUserPictures();

    const [url, init] = fetchMock.mock.calls[0] ?? [];

    expect(url).toBe('https://www.hunqz.com/api/opengrid/profiles/msescortplus');
    expect(readHeaders(init?.headers).accept).toBe('application/json');
  });

  it('builds a profile url from a slug or endpoint', () => {
    expect(getProfileUrl('abc')).toBe(`${REMOTE_PROFILE_BASE_URL}/abc`);
    expect(getProfileUrl('abc', '/api/profile/abc')).toBe('/api/profile/abc');
  });

  it('normalizes empty profiles to an empty list', () => {
    expect(normalizeUserPictures({})).toEqual([]);
  });

  it('uses default dimensions when a picture omits them', () => {
    const pictures = normalizeUserPictures({
      pictures: [
        {
          url_token: 'no-dimensions',
        },
      ],
    });

    expect(pictures[0]).toMatchObject({
      width: 800,
      height: 1000,
      aspectRatio: 0.8,
      src: `${PICTURE_BASE_URL}/no-dimensions.jpg`,
    });
  });

  it('fetches and parses json', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(remoteProfile), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }),
    );

    const profile = await fetchJson<RemoteProfile>('/api/profile/msescortplus', {
      headers: {
        'x-test': 'yes',
      },
    });

    const [url, init] = fetchMock.mock.calls[0] ?? [];

    expect(url).toBe('/api/profile/msescortplus');
    const headers = readHeaders(init?.headers);
    expect(headers.accept).toBe('application/json');
    expect(headers['x-test']).toBe('yes');
    expect(profile.name).toBe('msescortplus');
  });

  it('keeps headers passed as a Headers instance', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      const headers = readHeaders(init?.headers);
      expect(headers.accept).toBe('application/json');
      expect(headers['x-trace']).toBe('abc123');

      return new Response(JSON.stringify(remoteProfile), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });
    });

    await fetchJson<RemoteProfile>('/api/profile/msescortplus', {
      headers: new Headers({
        'x-trace': 'abc123',
      }),
    });

    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('throws when fetchJson receives a non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('nope', { status: 500 }),
    );

    await expect(fetchJson<RemoteProfile>('/api/profile/msescortplus')).rejects.toThrow(
      'Failed to fetch resource (500)',
    );
  });
});
