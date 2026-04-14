import Image from 'next/image';

import { ImageFrame } from '@erasys/ui';

interface GalleryImageCardProps {
  image: {
    id: string;
    src: string;
    alt: string;
  };
  index: number;
}

export const GalleryImageCard = ({ image, index }: GalleryImageCardProps) => (
  <ImageFrame className="rounded-[1.75rem] border border-white/80 bg-white/70 shadow-soft ring-1 ring-ink/5">
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={index < 4}
      fetchPriority={index < 4 ? 'high' : 'auto'}
      sizes="(min-width: 1280px) 220px, (min-width: 1024px) 20vw, 45vw"
      className="object-cover"
    />
  </ImageFrame>
);
