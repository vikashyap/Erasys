import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Card, Container, GallerySkeleton, Text } from '@erasys/ui';

import { GalleryGrid } from '@/components/gallery-grid';

export const metadata: Metadata = {
  title: 'Erasys Gallery',
  description: 'A clean image gallery experience.',
  openGraph: {
    title: 'Erasys Gallery',
    description: 'A clean image gallery experience.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="space-y-8 py-10 md:py-16">
        <Container>
          <Card
            as="section"
            id="gallery"
            className="max-w-3xl space-y-4 border-white/10 bg-white/[0.06] shadow-[0_24px_90px_rgba(255,107,53,0.16)] backdrop-blur-xl"
          >
            <Text as="p" className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">
              NEXT SSR
            </Text>
            <Text as="h1" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
              A light cached shell with a streamed SSR rendered gallery.
            </Text>
            <Text as="p" className="max-w-2xl text-sm leading-7 text-frost/70 md:text-base">
              The header, footer, and fallback shell revalidate hourly, while the gallery content is
              resolved on the server and the remote picture request uses a five-minute cache.
            </Text>
          </Card>
        </Container>
        <Container className="pb-8">
          <section aria-label="Profile image gallery">
            <Suspense
              fallback={
                <GallerySkeleton
                  className="grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
                  itemClassName="h-64 rounded-[1.5rem] bg-white/10 sm:h-80"
                />
              }
            >
              <GalleryGrid />
            </Suspense>
          </section>
        </Container>
      </section>
    </main>
  );
}
