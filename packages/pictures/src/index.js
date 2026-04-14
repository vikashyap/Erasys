export const PICTURE_BASE_URL = 'https://www.hunqz.com/img/usr/original/0x0';
export const REMOTE_PROFILE_BASE_URL = 'https://www.hunqz.com/api/opengrid/profiles';
const DEFAULT_PICTURE_WIDTH = 800;
const DEFAULT_PICTURE_HEIGHT = 1000;
const DEFAULT_PROFILE_NAME = 'User';
export const getPictureUrl = (urlToken) => `${PICTURE_BASE_URL}/${urlToken}.jpg`;
export const getProfileUrl = (slug = 'msescortplus', endpoint) => endpoint ?? `${REMOTE_PROFILE_BASE_URL}/${slug}`;
export const fetchJson = async (url, init) => {
    const headers = new Headers(init?.headers);
    headers.set('accept', 'application/json');
    const response = await fetch(url, {
        ...init,
        headers,
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch resource (${response.status})`);
    }
    return (await response.json());
};
const normalizePicture = (picture, profileName, index) => {
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
export const normalizeUserPictures = (profile) => {
    const normalizedPictures = [];
    const seenTokens = new Set();
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
        normalizedPictures.push(normalizePicture(picture, profileName, normalizedPictures.length));
    }
    return normalizedPictures;
};
export const fetchUserPictures = async ({ endpoint, init, slug = 'msescortplus', } = {}) => {
    const profile = await fetchJson(getProfileUrl(slug, endpoint), init);
    return normalizeUserPictures(profile);
};
