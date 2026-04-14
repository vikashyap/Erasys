import { connection } from 'next/server';

import {
  fetchUserPictures,
  type UserPicture,
} from '@erasys/pictures';
import { GalleryError, Grid } from '@erasys/ui';

import { GalleryImageCard } from '@/components/gallery-image-card';

const GALLERY_SLUG = 'msescortplus';
const GALLERY_STALE_TIME_SECONDS = 5 * 60;

export const GalleryGrid = async () => {
  await connection();

  let galleryImages: UserPicture[];

  try {
    galleryImages = await fetchUserPictures({
      init: { next: { revalidate: GALLERY_STALE_TIME_SECONDS } },
      slug: GALLERY_SLUG,
    });
  } catch {
    return (
      <GalleryError className="border border-accentWarm/30 bg-white/70 text-slate-700 shadow-soft">
        We could not load the gallery right now. Please try again in a moment.
      </GalleryError>
    );
  }


  if (galleryImages.length === 0) {
    return (
      <GalleryError className="border border-accent/25 bg-white/70 text-slate-700 shadow-soft">
        No gallery images are available right now.
      </GalleryError>
    );
  }

  return (
    <Grid className="grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {galleryImages.map((image: UserPicture, index: number) => (
        <GalleryImageCard
          key={image.id}
          image={image}
          index={index}
        />
      ))}
    </Grid>
  );
};
