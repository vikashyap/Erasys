import { Header, Text } from '@erasys/ui';

export const SiteHeader = () => (
  <Header className="border-b border-white/10 bg-night/75 backdrop-blur-xl">
    <Header.Brand>
      <a href="/" className="flex items-center gap-3">
        <Text as="span" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-frost text-sm font-black text-night">
          S
        </Text>
        <Text as="span" className="flex flex-col">
          <Text as="span" className="block font-display text-base font-semibold">
            SPA Gallery
          </Text>
          <Text as="span" className="block text-xs uppercase tracking-[0.24em] text-frost/55">
            Client Rendered
          </Text>
        </Text>
      </a>
    </Header.Brand>
    <Header.Actions>
      <a
        href="#gallery"
        className="rounded-full bg-frost px-4 py-2 text-sm font-semibold text-night transition hover:bg-lagoon"
      >
        View gallery
      </a>
    </Header.Actions>
  </Header>
);
