module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hover-gray-light' : 'rgb(243, 244, 246)',
        'hover-gray-dark' : 'rgb(56,54,59)',
        'default-bg-light': 'rgb(250,248,251)',
        'default-bg-dark' : 'rgb(22,23,26)',
        'lighter-black' : 'rgb(27,25,28)',
        'white-dark' : 'rgb(253,253,253)',
        'gray-light' : 'rgb(126,126,126)',
        'gray-dark' : 'rgb(205,202,206)',
        'light-border-dark' : 'rgb(95,95,95)',
        'lighter-border-dark' : 'rgb(40,39,43)',
      }
    }
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};
