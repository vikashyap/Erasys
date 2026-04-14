import { useQuery } from '@tanstack/react-query';

import { fetchUserPictures } from '@erasys/pictures';

const GALLERY_SLUG = 'msescortplus';
const GALLERY_LIMIT = 60;

const getGalleryPictures = () => fetchUserPictures({ slug: GALLERY_SLUG });

export const useGalleryPictures = () =>
  useQuery({
    queryKey: ['gallery-pictures', GALLERY_SLUG],
    queryFn: getGalleryPictures,
    select: (pictures) => pictures.slice(0, GALLERY_LIMIT),
  });
