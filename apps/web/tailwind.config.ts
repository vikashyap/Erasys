import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#fbf4e8',
        ink: '#12211f',
        mist: '#e7dccb',
        sand: '#ead7bd',
        accent: '#0f766e',
        accentWarm: '#b66b1f',
      },
      boxShadow: {
        soft: '0 24px 70px -34px rgba(18, 33, 31, 0.38)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        display: ['"Avenir Next"', '"Trebuchet MS"', 'ui-sans-serif', 'system-ui'],
        body: ['"Avenir Next"', '"Trebuchet MS"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at 15% 12%, rgba(15, 118, 110, 0.18), transparent 30%), radial-gradient(circle at 85% 6%, rgba(182, 107, 31, 0.18), transparent 28%), linear-gradient(135deg, #fff9ef 0%, #fbf4e8 52%, #f1dfc5 100%)',
      },
    },
  },
};

export default config;
