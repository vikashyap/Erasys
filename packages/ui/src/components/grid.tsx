import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/cn';

export const Grid = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('grid', className)} {...props} />
);
