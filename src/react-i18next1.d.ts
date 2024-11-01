// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import 'react-i18next';

import common from '../public/locales/en/common.json';
import home from '../public/locales/en/home.json';
import apostle from '../public/locales/en/apostle.json';
import land from '../public/locales/en/land.json';
import events from '../public/locales/en/events.json';
import farm from '../public/locales/en/farm.json';
import asset from '../public/locales/en/asset.json';
import drill from '../public/locales/en/drill.json';
import agreement from '../public/locales/en/agreement.json';
import furnace from '../public/locales/en/furnace.json';
import gov from '../public/locales/en/gov.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof common & Record<string, string>;
      home: typeof home & Record<string, string>;
      apostle: typeof apostle & Record<string, string>;
      land: typeof land & Record<string, string>;
      events: typeof events;
      farm: typeof farm;
      asset: typeof asset;
      drill: typeof drill;
      agreement: typeof agreement;
      furnace: typeof furnace;
      gov: typeof gov;
    };
  }
}
