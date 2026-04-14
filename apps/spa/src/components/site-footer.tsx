import { Footer, Text } from '@erasys/ui';

const SOCIAL_LINKS = [
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://twitter.com', label: 'Twitter' },
  { href: 'https://instagram.com', label: 'Instagram' },
] as const;

export const SiteFooter = () => (
  <Footer className="border-t border-white/10 bg-night/70 text-frost/60 backdrop-blur-xl">
    <Footer.Copyright>
      <Text as="span" className="text-frost/40">
        Copyright © 2026 Erasys. All rights reserved.
      </Text>
    </Footer.Copyright>

    <Footer.Links>
      <Footer.LinksList>
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href} className="list-none">
            <Footer.Link
              href={link.href}
              className="border border-white/10 bg-white/[0.06] text-frost/70 hover:border-lagoon hover:text-lagoon"
            >
              {link.label}
            </Footer.Link>
          </li>
        ))}
      </Footer.LinksList>
    </Footer.Links>
  </Footer>
);
