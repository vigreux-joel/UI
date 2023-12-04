import type { Config } from 'tailwindcss';
import { createConfig } from '../tailwind-material/src';

const config: Config = createConfig(
  {
    darkMode: 'class',
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './stories/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      },
    },
  },
  {
    colorPalette: {
      primary: '#6750A4',
    },
  }
);

export default config;
