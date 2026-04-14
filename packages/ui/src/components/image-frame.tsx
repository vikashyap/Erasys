import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { cn } from '../lib/cn';

export interface ImageFrameProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const ImageFrame = forwardRef<HTMLDivElement, ImageFrameProps>(function ImageFrame(
  { children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('overflow-hidden', className)} {...props}>
      <div className="relative aspect-[4/5] w-full">{children}</div>
    </div>
  );
});
