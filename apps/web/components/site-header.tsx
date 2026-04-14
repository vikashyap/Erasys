import { Header } from '@erasys/ui';

export const SiteHeader = () => (
  <Header className="border-b border-white/70 bg-white/55 shadow-sm backdrop-blur-xl">
    <Header.Brand>
      <a href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-sm font-bold text-white shadow-soft">
          E
        </div>
        <div>
          <p className="font-display text-base font-semibold text-ink">Erasys Gallery</p>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Server Rendered</p>
        </div>
      </a>
    </Header.Brand>

    <Header.Actions>
      <Header.Nav className="gap-4 text-slate-600">
        <Header.Link href="#gallery" className="hover:text-accent">
          Gallery
        </Header.Link>
        <Header.Link href="#footer" className="hover:text-accent">
          Footer
        </Header.Link>
      </Header.Nav>

      <a
        href="/#gallery"
        className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-accent"
      >
        View gallery
      </a>
    </Header.Actions>
  </Header>
);
