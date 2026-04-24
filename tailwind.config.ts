import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'solar-radial': 'radial-gradient(circle at top, rgba(54, 211, 153, 0.22), transparent 38%), radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.16), transparent 20%), linear-gradient(135deg, rgba(4, 12, 24, 0.98), rgba(3, 7, 18, 0.92))'
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 0, 0, 0.35)',
        glow: '0 0 45px rgba(34, 211, 238, 0.24)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;