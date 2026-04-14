import { useQuery } from '@tanstack/react-query';

import {
  fetchUserPictures,
} from '@erasys/pictures';

const PROFILE_ENDPOINT = '/hunqz-api/profiles/msescortplus';
const GALLERY_LIMIT = 120;

const getGalleryPictures = async () => {
  return fetchUserPictures({
    endpoint: PROFILE_ENDPOINT,
  });
};

export const useGalleryPictures = () =>
  useQuery({
    queryKey: ['gallery-pictures', PROFILE_ENDPOINT],
    queryFn: getGalleryPictures,
    select: (pictures) => pictures.slice(0, GALLERY_LIMIT),
  });
