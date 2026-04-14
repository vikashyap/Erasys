import { Card, Container, GalleryError, GallerySkeleton, Grid, Text } from '@erasys/ui';

import { useGalleryPictures } from '../hooks/use-gallery-pictures';
import { GalleryImageCard } from '../components/gallery-image-card';

export const HomePage = () => {
  const galleryQuery = useGalleryPictures();

  return (
    <main className="flex-1">
      <section className="space-y-8 py-10 md:py-16">
        <Container>
          <Card
            as="section"
            id="gallery"
            className="max-w-3xl space-y-4 border-white/10 bg-white/[0.06] shadow-glow backdrop-blur-xl"
          >
            <Text as="p" className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">
              React SPA
            </Text>
            <Text as="h1" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
              A dark client-side gallery using the same shared packages.
            </Text>
            <Text as="p" className="max-w-2xl text-sm leading-7 text-frost/70 md:text-base">
              React Query caches the gallery data for five minutes, while the Vite dev proxy keeps
              the browser away from direct cross-origin API calls.
            </Text>
          </Card>
        </Container>
        <Container className="pb-8">
          <section aria-label="Profile image gallery">
            {galleryQuery.isPending ? (
              <GallerySkeleton
                className="grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
                itemClassName="h-64 rounded-[1.5rem] bg-white/10 sm:h-80"
              />
            ) : null}
            {galleryQuery.isError ? (
              <GalleryError className="border border-ember/40 bg-ember/10 text-frost" />
            ) : null}
            {galleryQuery.isSuccess ? (
              <Grid className="grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {galleryQuery.data.map((image, index) => (
                  <GalleryImageCard key={image.id} image={image} index={index} />
                ))}
              </Grid>
            ) : null}
          </section>
        </Container>
      </section>
    </main>
  );
};
