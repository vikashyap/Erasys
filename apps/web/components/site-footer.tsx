import { Footer, Text } from '@erasys/ui';

const SOCIAL_LINKS = [
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://twitter.com', label: 'Twitter' },
  { href: 'https://instagram.com', label: 'Instagram' },
] as const;

export const SiteFooter = () => (
  <Footer
    id="footer"
    className="border-t border-white/70 bg-gradient-to-b from-white/45 to-sand/50 text-slate-600"
  >
    <Footer.Copyright>
      <Text as="span" className="text-slate-400">
        Copyright © 2026 Erasys. All rights reserved.
      </Text>
    </Footer.Copyright>

    <Footer.Links>
      <Footer.LinksList>
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href} className="list-none">
            <Footer.Link
              href={link.href}
              className="border border-white/70 bg-white/70 text-slate-700 shadow-sm hover:border-accent hover:text-accent"
            >
              {link.label}
            </Footer.Link>
          </li>
        ))}
      </Footer.LinksList>
    </Footer.Links>
  </Footer>
);
