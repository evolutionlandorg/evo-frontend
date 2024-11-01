// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CracoLessPlugin = require('craco-less');

module.exports = async function () {
  // await ...

  return {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    },
    webpack: {
      configure: {
        resolve: {
          plugins: [new TsconfigPathsPlugin({})]
        }
      }
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { 
                '@text-color': "#FFFFFF",
                '@primary-color': '#01D1FF',
                '@border-color-base': 'rgba(75,85,99,var(--tw-border-opacity))',
                '@border-radius-base': '16px'
              },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  }
}
