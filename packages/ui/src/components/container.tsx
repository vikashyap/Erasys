import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/cn';

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'section' | 'header' | 'main';
}

export const Container = ({
  as: Tag = 'div',
  className,
  ...props
}: ContainerProps) => (
  <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
);

