import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/cn';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'section' | 'article';
}

export const Card = ({ as: Tag = 'div', className, ...props }: CardProps) => (
  <Tag className={cn('rounded-[2rem] border p-6 md:p-8', className)} {...props} />
);
