import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/cn';

export const SkeletonLoader = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('animate-pulse', className)}
    {...props}
  />
);
