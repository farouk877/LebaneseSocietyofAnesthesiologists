/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        lsa: {
          ink: '#13211c',
          muted: '#52645d',
          forest: '#123d2f',
          green: '#1f6f4a',
          leaf: '#5f8f49',
          sage: '#dfeadf',
          copper: '#9a6634',
          line: '#d9e5dc',
          paper: '#f7faf5',
          mist: '#edf5ee'
        }
      },
      fontFamily: {
        sans: ['Avenir Next', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Iowan Old Style', 'Charter', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 18px 45px rgb(18 33 43 / 0.08)'
      }
    }
  },
  plugins: []
};
