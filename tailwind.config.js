// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        visibleslow: {
          '0%': { visibility: 'hidden', opacity: 0 },
          '100%': { visibility: 'visible', opacity: 1 },
        },
        hiddenslow: {
          '0%': { visibility: 'visible', opacity: 1 },
          '100%': { visibility: 'hidden', opacity: 0 },
        },
      },
      animation: {
        'visible-slow': 'visibleslow 0.5s ease 1 normal forwards',
        'invisible-slow': 'hiddenslow 0.5s ease 1 normal forwards',
      },
      color: {
        'primary': '#FFFFFF'
      },
      backgroundColor: {
        'pannel': '#323A32',
        'modal': '#323A32',
        'nft-item': '#3F4548'
      }
    },
    // eslint-disable-next-line global-require, import/extensions
    screens: require('./src/config/breakpoints/breakpoints.js')
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      scale: ['active'],
      opacity: ['active'],
      boxShadow: ['active'],
      borderColor: ['active'],
    },
  },
  plugins: [],
}
