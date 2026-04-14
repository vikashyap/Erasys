import type { ComponentPropsWithoutRef } from 'react';

type TextTag =
  | 'h1'
  | 'label'
  | 'p'
  | 'span';

type TextProps<T extends TextTag> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Text = <T extends TextTag = 'p'>({
  as,
  className,
  ...props
}: TextProps<T>) => {
  const Tag = (as ?? 'p') as any;

  return <Tag className={className} {...props} />;
};
