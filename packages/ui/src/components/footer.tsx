import type { ComponentPropsWithoutRef } from 'react';

import { Container } from './container';
import { cn } from '../lib/cn';

export type FooterProps = ComponentPropsWithoutRef<'footer'>;

const FooterRoot = ({ className, children, ...props }: FooterProps) => (
  <footer className={className} {...props}>
    <Container className="flex flex-col gap-8 py-10 text-sm md:flex-row md:items-end md:justify-between">
      {children}
    </Container>
  </footer>
);

const FooterLinks = ({ className, ...props }: ComponentPropsWithoutRef<'nav'>) => (
  <nav aria-label="Social links" className={cn('space-y-3 md:text-right', className)} {...props} />
);

const FooterLinksList = ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
  <ul className={cn('flex flex-wrap gap-3 md:justify-end', className)} {...props} />
);

const FooterLink = ({ className, ...props }: ComponentPropsWithoutRef<'a'>) => (
  <a
    target="_blank"
    rel="noreferrer"
    className={cn('rounded-full px-4 py-2 font-medium transition', className)}
    {...props}
  />
);

const FooterCopyright = (props: ComponentPropsWithoutRef<'div'>) => <div {...props} />;

export const Footer = Object.assign(FooterRoot, {
  Copyright: FooterCopyright,
  Link: FooterLink,
  Links: FooterLinks,
  LinksList: FooterLinksList,
});
