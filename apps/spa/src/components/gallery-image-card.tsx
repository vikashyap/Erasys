import { ImageFrame } from '@erasys/ui';

interface GalleryImageCardProps {
  image: {
    id: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  index: number;
}

export const GalleryImageCard = ({ image, index }: GalleryImageCardProps) => (
  <ImageFrame className="rounded-[1.75rem] border border-white/80 bg-white/70 shadow-soft ring-1 ring-ink/5">
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={index < 4 ? 'eager' : 'lazy'}
      fetchPriority={index < 4 ? 'high' : 'auto'}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </ImageFrame>
);
