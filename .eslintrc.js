// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["./src"],
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      },
      typescript: {

      }
    },
    "import/extensions": [".js", ".ts", ".jsx", ".tsx"],
  },

  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: [
    "header",
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    // Typescript
    "@typescript-eslint/no-unused-vars": "warn",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["warn"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    "no-plusplus": 0,
    "prefer-destructuring": ["warn", { object: true, array: false }],
    "no-underscore-dangle": 0,
    // React
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/prop-types": 0,
    "react/sort-comp": 1,
    "react/jsx-props-no-spreading": 0,
    "react/no-multi-comp": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": 0,
    'header/header': [2, 'line', [
      ' Copyright 2018-2021 evolution.land authors & contributors',
      ' SPDX-License-Identifier: Apache-2.0'
    ], 2],
    // Start temporary rules
    // These rules are here just to keep the lint error to 0 during the migration to the new rule set
    // They need to be removed and fixed as soon as possible
    "@typescript-eslint/ban-ts-comment": [1, { "ts-ignore": false, "ts-nocheck": false }],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "radix": 0,
    "import/no-extraneous-dependencies": 0,
    "jsx-a11y/media-has-caption": 0,
    "arrow-body-style": 1,
    // Exchange
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "memo", "config", "opt"] }],
    "react/require-default-props": 0,
    "no-nested-ternary": 0,
    "max-classes-per-file": 0,
    // End temporary rules
    // Template
    "react/no-array-index-key": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "camelcase": 0,
    "react/destructuring-assignment": 0,
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "jsx-a11y/control-has-associated-label": 0,
    "jsx-a11y/no-static-element-interactions": 0
  },
};