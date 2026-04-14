export const PICTURE_BASE_URL = 'https://www.hunqz.com/img/usr/original/0x0';
export const REMOTE_PROFILE_BASE_URL = 'https://www.hunqz.com/api/opengrid/profiles';
const DEFAULT_PICTURE_WIDTH = 800;
const DEFAULT_PICTURE_HEIGHT = 1000;
const DEFAULT_PROFILE_NAME = 'User';

export interface RemotePicture {
  id?: string;
  url_token: string;
  width?: number;
  height?: number;
  is_public?: boolean;
}

export interface RemoteProfile {
  name?: string;
  preview_pic?: RemotePicture;
  pictures?: RemotePicture[];
}

export interface UserPicture {
  id: string;
  token: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  alt: string;
  isPublic: boolean;
}

export interface FetchUserPicturesOptions {
  endpoint?: string;
  init?: RequestInit;
  slug?: string;
}

export const getPictureUrl = (urlToken: string) => `${PICTURE_BASE_URL}/${urlToken}.jpg`;

export const getProfileUrl = (
  slug = 'msescortplus',
  endpoint?: string,
): string =>
  endpoint ?? `${REMOTE_PROFILE_BASE_URL}/${slug}`;

export const fetchJson = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const headers = new Headers(init?.headers);
  headers.set('accept', 'application/json');

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resource (${response.status})`);
  }

  return (await response.json()) as T;
};

const normalizePicture = (
  picture: RemotePicture,
  profileName: string,
  index: number,
): UserPicture => {
  const width = picture.width ?? DEFAULT_PICTURE_WIDTH;
  const height = picture.height ?? DEFAULT_PICTURE_HEIGHT;

  return {
    id: picture.id ?? picture.url_token,
    token: picture.url_token,
    src: getPictureUrl(picture.url_token),
    width,
    height,
    aspectRatio: width / height,
    alt: `${profileName} picture ${index + 1}`,
    isPublic: picture.is_public ?? true,
  };
};

export const normalizeUserPictures = (profile: RemoteProfile): UserPicture[] => {
  const normalizedPictures: UserPicture[] = [];
  const seenTokens = new Set<string>();
  const profileName = profile.name ?? DEFAULT_PROFILE_NAME;

  if (profile.preview_pic?.url_token) {
    seenTokens.add(profile.preview_pic.url_token);
    normalizedPictures.push(normalizePicture(profile.preview_pic, profileName, 0));
  }

  for (const picture of profile.pictures ?? []) {
    if (!picture.url_token || seenTokens.has(picture.url_token)) {
      continue;
    }

    seenTokens.add(picture.url_token);
    normalizedPictures.push(
      normalizePicture(picture, profileName, normalizedPictures.length),
    );
  }

  return normalizedPictures;
};

export const fetchUserPictures = async ({
  endpoint,
  init,
  slug = 'msescortplus',
}: FetchUserPicturesOptions = {}): Promise<UserPicture[]> => {
  const profile = await fetchJson<RemoteProfile>(getProfileUrl(slug, endpoint), init);
  return normalizeUserPictures(profile);
};
