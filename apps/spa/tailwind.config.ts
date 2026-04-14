import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#080b12',
        ember: '#ff6b35',
        lagoon: '#17c3b2',
        frost: '#d8f3ff',
        graphite: '#111827',
      },
      boxShadow: {
        glow: '0 24px 80px -32px rgba(23, 195, 178, 0.7)',
      },
      fontFamily: {
        display: ['"Avenir Next"', '"Trebuchet MS"', 'ui-sans-serif', 'system-ui'],
        body: ['"Avenir Next"', '"Trebuchet MS"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'night-grid':
          'radial-gradient(circle at 15% 20%, rgba(23, 195, 178, 0.22), transparent 28%), radial-gradient(circle at 85% 10%, rgba(255, 107, 53, 0.18), transparent 26%), linear-gradient(135deg, #080b12 0%, #101827 48%, #080b12 100%)',
      },
    },
  },
};

export default config;
