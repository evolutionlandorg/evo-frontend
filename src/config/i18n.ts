// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LNGS } from './constants';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LNGS,
    nonExplicitSupportedLngs: true,
    ns: ['common', 'home', 'apostle', 'land', 'events', 'farm', 'asset', 'drill', 'agreement', 'furnace', 'gov'],
    fallbackNS: ['common', 'home', 'apostle', 'land', 'events', 'farm', 'asset', 'drill', 'agreement', 'furnace', 'gov'],
    defaultNS: 'common',
    lowerCaseLng: true,
    saveMissing: true,
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      queryStringParams: { v: '1.0.0' }
    },
    react: {
      transSupportBasicHtmlNodes: true
    },
    detection: {
      order: ['querystring', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain']
    }
  })
  .catch((err) => {
    console.error('init i18n:', err);
  });

export default i18n;
