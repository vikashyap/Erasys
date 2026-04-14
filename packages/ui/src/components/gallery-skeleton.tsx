import type { ComponentPropsWithoutRef } from 'react';

import { Grid } from './grid';
import { SkeletonLoader } from './skeleton-loader';
import { cn } from '../lib/cn';

export interface GallerySkeletonProps extends ComponentPropsWithoutRef<'div'> {
  count?: number;
  itemClassName?: string;
}

export const GallerySkeleton = ({
  count = 8,
  className,
  itemClassName,
  ...props
}: GallerySkeletonProps) => (
  <Grid aria-hidden="true" className={className} {...props}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonLoader key={index} className={cn('h-64 rounded-2xl', itemClassName)} />
    ))}
  </Grid>
);
