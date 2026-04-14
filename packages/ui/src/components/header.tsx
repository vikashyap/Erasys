import type { ComponentPropsWithoutRef } from 'react';

import { Container } from './container';
import { cn } from '../lib/cn';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

const HeaderRoot = ({ className, children, ...props }: HeaderProps) => (
  <header className={cn('sticky top-0 z-50', className)} {...props}>
    <Container className="flex min-h-16 items-center justify-between gap-6">{children}</Container>
  </header>
);

const HeaderBrand = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('flex items-center gap-3', className)} {...props} />
);

const HeaderNav = ({ className, ...props }: ComponentPropsWithoutRef<'nav'>) => (
  <nav
    aria-label="Primary"
    className={cn('hidden items-center gap-6 text-sm font-medium md:flex', className)}
    {...props}
  />
);

const HeaderActions = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('flex items-center gap-3', className)} {...props} />
);

const HeaderLink = ({ className, ...props }: ComponentPropsWithoutRef<'a'>) => (
  <a className={cn('transition', className)} {...props} />
);

export const Header = Object.assign(HeaderRoot, {
  Actions: HeaderActions,
  Brand: HeaderBrand,
  Link: HeaderLink,
  Nav: HeaderNav,
});
