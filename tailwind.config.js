/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'dark-1': '#383838', // Lightest dark gray
        'dark-2': '#323232', // Slightly darker gray
        'dark-3': '#2c2c2c', // Medium dark gray
        'dark-4': '#262626', // A step deeper into darkness
        'dark-5': '#202020', // Neutral dark gray
        'dark-6': '#1a1a1a', // Standard dark mode gray
        'dark-7': '#141414', // Deeper dark gray
        'dark-8': '#0f0f0f', // Almost black
        'dark-9': '#0a0a0a', // Very close to pitch black
        'dark-10': '#050505',
        primary: '#978CF5',
        background: '#121721',
        text: 'F4F4F4',
        backgroundlight: '#20202B'
      }
    }
  },
  plugins: []
};
