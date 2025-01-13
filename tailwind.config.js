/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px', // Custom breakpoint for extra small screens
        'custom-900': '900px', // Custom breakpoint
        'custom-800': '800px',
        'custom-1200': '1200px',
        'custom-1024': '1024px',
        'custom-1600': '1600px'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'slide-out': 'slideOut 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.4s ease-in',
        'scale-up': 'scaleUp 0.5s ease-in-out',
        'scale-down': 'scaleDown 0.5s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0.2 },
          '100%': { opacity: 1 }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)' }
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        scaleDown: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.8)', opacity: 0 }
        }
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#DF728B',
        background: '#181820',
        backgroundlight: '#21212B',
        textColor: '#E8E8E8'
      }
    }
  },
  plugins: []
};
