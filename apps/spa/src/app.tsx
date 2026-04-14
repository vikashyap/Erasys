import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { HomePage } from './pages/home-page';

export const App = () => (
  <div className="flex min-h-screen flex-col bg-night-grid font-body text-frost">
    <SiteHeader />
    <HomePage />
    <SiteFooter />
  </div>
);
