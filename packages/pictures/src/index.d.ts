type FetchLike = typeof fetch;
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
    fetch?: FetchLike;
    init?: RequestInit;
    slug?: string;
}
export declare const getPictureUrl: (urlToken: string) => string;
export declare const normalizeUserPictures: (profile: RemoteProfile) => UserPicture[];
export declare const fetchUserPictures: ({ endpoint, fetch: fetchImpl, init, slug, }?: FetchUserPicturesOptions) => Promise<UserPicture[]>;
export {};
