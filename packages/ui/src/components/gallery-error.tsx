import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/cn';

export type GalleryErrorProps = ComponentPropsWithoutRef<'div'>;

export const GalleryError = ({
  children = 'We could not load the gallery right now. Please try again in a moment.',
  className,
  ...props
}: GalleryErrorProps) => (
  <div role="alert" className={cn('rounded-2xl p-6 text-sm', className)} {...props}>
    {children}
  </div>
);
