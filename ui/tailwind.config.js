module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'inter': '"Inter"'
    },
    extend: {
      colors: {
        'orange' : '#FFA93D',
        'orange-80' : '#FFBA64',
        'orange-60' : '#FECA8B',
        'orange-50' : '#FFD49E',
        'orange-40' : '#FEDDB0',
        'orange-30' : '#FEE7C5',
        'orange-20' : '#FFEED8',
        'orange-10' : '#FEF6EC',
        'orange-5' : '#FEFBF5',
        'blue' : '#42BCFF',
        'blue-90' : '#54C3FE',
        'blue-70' : '#7BD1FF',
        'blue-50' : '#A1DFFE',
        'blue-20' : '#D9F2FF',
        'black-100' : '#1D1B1A',
        'black-98' : '#20211E',
        'black-95' : '#282626',
        'black-90' : '#343330',
        'black-85' : '#3F3D3C',
        'black-80' : '#4A4948',
        'black-70' : '#60605E',
        'black-60' : '#777777',
        'black-50' : '#8F8D8C',
        'black-40' : '#A4A4A2',
        'black-30' : '#BDBBBA',
        'black-20' : '#D2D1D1',
        'black-15' : '#DCDDDC',
        'black-10' : '#E9E8E9',
        'black-5' : '#F3F2F2',
        'black-2' : '#FBFAFA',
        'black-1' : '#FCFDFC',
      }
    }
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};
