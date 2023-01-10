const themeSwapper = require('tailwindcss-theme-swapper')

const fontSizes =  {
  'xs': '.75rem',
  'sm': '14px',
   'base': '16px',
   'bigger' : '18px',
   'lg': '20px',
   'xl': '24px',
   '2xl': '28px',
   '4xl': '40px',
 };

const base = {
  theme: {
    colors: {
      'background-default' : '#FFFFFF',
      'background-darker' : '#FBFAFA',
      'background-icon' : '#4A4948',
      'background-badge' : '#8ECCF9',
      'background-input' : '#E9E8E9',
      'background-textarea' : '#E9E8E9',
      'background-input-focused' : '#FCFDFC',
      'background-player-button' : '#FFFFFF',
      'background-shortcut-button' : '#FFFFFF',
      'background-navitem-viewers' : '#60605E', 
      'text-icon' : '#FFFFFF',
      'text-primary' : '#4A4948',
      'text-default' :  '#60605E',
      'text-secondary' : '#777777',
      'text-primary-inverted' : '#F3F2F2',
      'text-full' : '#000000',
      'text-button' : '#FFFFFF',
      'border-mild' : '#DCDDDC',
      'border-default': '#D2D1D1',
      'border-intense' : '#BDBBBA',
      'border-super-intense' : '#4A4948',
      'hover-mild' :  '#F6F7F7',
      'hover-default' :  '#E9E8E9',
       'hover-intense' : '#DCDDDC',
       'hover-super-intense' : '#BDBBBA',
       'orange' : '#F5970A',
       'orange-90' : '#F6A322',
       'orange-80' : '#F6AD3B',
       'orange-70' : '#F8B754',
       'orange-60' : '#F9C16C',
       'orange-50' : '#FACA84',
       'orange-40' : '#FAD49D',
       'orange-30' : '#FDE0B7',
       'orange-20' : '#FDEBCF',
       'orange-15' : '#FFF0DB',
       'orange-10' : '#FEF5E7',
       'orange-5' : '#FFFBF2',
      'orange-disabled': '#FACA84',
      'orange-input' : '#FDEBCF',
      'orange-input-focused' : '#FFFBF2',
      'blue' : '#1D9AF1',
      'blue-90' : '#34A5F3',
      'blue-80' : '#4BAFF4',
      'blue-70' : '#61B9F6',
      'blue-60' : '#76C3F7',
      'blue-50' : '#8ECCF9',
      'blue-20' : '#D2EAFD',
      'blue-disabled' : '#76C3F7',
      'blue-button' : '#1D9AF1',
      'black-100' : '#1D1B1A',
      'black-98' : '#20211E',
      'black-95' : '#282626',
      'black-90' : '#343330',
      'black-85' : '#3F3D3C',
      'black-80' : '#4A4948',
      'black-75' : '#575553',
      'black-70' : '#60605E',
      'black-60' : '#777777',
      'black-50' : '#8F8D8C',
      'black-40' : '#A4A4A2',
      'black-30' : '#BDBBBA',
      'black-25' : '#C7C6C4',
      'black-20' : '#D2D1D1',
      'black-15' : '#DCDDDC',
      'black-10' : '#E9E8E9',
      'black-5' : '#F3F2F2',
      'black-4' : '#F6F7F7',
      'black-3' : '#F8F9F9',
      'black-2' : '#FBFAFA',
      'black-1' : '#FCFDFC',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.072)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.072)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.72)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    fontSize: fontSizes,
    opacity: {
      'disabled' : '.7',
    }
  },
};

const dark = {
  theme: {
    colors: {
      'background-default' : '#282626',
      'background-darker' : '#1D1B1A',
      'background-icon' : '#60605E',
      'background-badge' : '#76C3F7',
      'background-input' : '#60605E',
      'background-textarea' : '#4A4948',
      'background-input-focused' : '#3F3D3C',
      'background-player-button' : '#343330',  
      'background-shortcut-button' : '#777777',
     'background-navitem-viewers' : '#777777', 
      'text-icon' : '#F3F2F2',
      'text-primary' : '#F3F2F2',
      'text-default' :  '#DCDDDC',
      'text-secondary' : '#D2D1D1',
      'text-full' : '#FFFFFFF',
      'text-button' : '#4A4948',
      'border-mild' : '#3F3D3C',
      'border-default': '#4A4948',
      'border-intense' : '#777777',
      'border-super-intense' : '#F3F2F2',
      'hover-mild' :  '#343330',
      'hover-default' :  '#4A4948',
      'hover-intense' : '#60605E',
      'hover-super-intense' : '#8F8D8C',
      'orange' : '#F5970A',
      'orange-90' : '#F6A322',
      'orange-80' : '#F6AD3B',
      'orange-70' : '#F8B754',
      'orange-60' : '#F9C16C',
      'orange-50' : '#FACA84',
      'orange-40' : '#FAD49D',
      'orange-30' : '#FDE0B7',
      'orange-20' : '#FDEBCF',
      'orange-15' : '#FFF0DB',
      'orange-10' : '#FEF5E7',
      'orange-5' : '#FFFBF2',
     'orange-disabled': '#FACA84',
     'orange-input' : '#FDEBCF',
     'orange-input-focused' : '#FFFBF2',
      'blue' : '#1D9AF1',
      'blue-90' : '#34A5F3',
      'blue-80' : '#4BAFF4',
      'blue-70' : '#61B9F6',
      'blue-60' : '#76C3F7',
      'blue-50' : '#8ECCF9',
      'blue-20' : '#D2EAFD',
      'blue-disabled' : '#4F86A2',
      'blue-button' : '#4BAFF4',
      'black-100' : '#1D1B1A',
      'black-98' : '#20211E',
      'black-95' : '#282626',
      'black-90' : '#343330',
      'black-85' : '#3F3D3C',
      'black-80' : '#4A4948',
      'black-75' : '#575553',
      'black-70' : '#60605E',
      'black-60' : '#777777',
      'black-50' : '#8F8D8C',
      'black-40' : '#A4A4A2',
      'black-30' : '#BDBBBA',
      'black-25' : '#C7C6C4',
      'black-20' : '#D2D1D1',
      'black-15' : '#DCDDDC',
      'black-10' : '#E9E8E9',
      'black-5' : '#F3F2F2',
      'black-4' : '#F6F7F7',
      'black-3' : '#F8F9F9',
      'black-2' : '#FBFAFA',
      'black-1' : '#FCFDFC',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.36)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.36)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.36)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none', 
    },
    fontSize: fontSizes,
    opacity: {
      'disabled' : '.5',
    }
  },
};

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class',
  theme: {
    extend: {
      dropShadow: {
        'default-dark': '0 1px 2px rgba(0, 0, 0, 0.7)',
        'md-dark': '0 4px 3px rgba(0, 0, 0, 0.55)',
      },
    }
  },
  plugins: [
    themeSwapper({
      themes: [
        { name: 'base', selectors: [':root'], theme: base.theme },
        { name: 'dark', selectors: ['.dark'], theme: dark.theme },
      ],
    }),
  ]
};
