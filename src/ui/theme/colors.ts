// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Colors } from './types';

export const baseColors = {
  failure: '#ED4B9E',
  primary: '#00C2FF',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#7645D9',
  success: '#31D0AA',
  warning: '#FFB237'
};

export const lightColors: Colors = {
  ...baseColors,
  background: '#faf9fa',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#676e67',
  backgroundFocus: '#232C31',
  backgroundContent: 'linear-gradient(270deg, #111827 0%, #0E1422 100%)',
  backgroundGradientContent: 'background: linear-gradient(270deg, #111827 0%, #0E1422 100%)', // 全局渐变颜色模块
  backgroundGradientContentFocus: 'linear-gradient(270deg, #111827 0%, #0E1422 100%)', // 全局渐变颜色模块-选中

  cardBorder: '#E7E3EB',
  cardBorderSecondary: 'rgba(57, 71, 103, 0.2)',

  tertiary: '#EFF4F5',

  text: '#1c1e21',
  textDisabled: '#BDC2C4',
  textTitle: '#6988BE',
  textSubtle: '#7A6EAA',
  textActive: '#00EEFF',
  disabled: '#E9EAEB',
  overlay: '#CCCCCC',
  input: '#eeeaf4',
  inputSecondary: '#d7caec',

  contrast: '#191326',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  divider: '#4d5562',

  backgroundRING: 'linear-gradient(315deg, #FF0050 0%, #7000FF 71.44%, #0E00FF 100%)',
  backgroundKTON: 'linear-gradient(90deg, #00AF4E 0%, #00DC44 100%)',
  collapseHeaderBackground: '#394767',
  collapseBodyBackground: 'linear-gradient(270deg, rgba(17, 24, 39, 0.8) 0%, rgba(14, 20, 34, 0.8) 100%);',
  numberBackground: 'linear-gradient(270deg, #7FBE39 1.4%, #10C604 100%)',
  apostleBackground: 'linear-gradient(116.5deg, #F76B1C 16.63%, #FAD961 83.37%)',
  itemBackground: 'linear-gradient(276.02deg, #3ADDFF 5.61%, #0066FF 99.93%)',
  eventsBackground: 'linear-gradient(116.5deg, #F76B1C 16.63%, #FAD961 83.37%)',
  chartLineGreen: '#15FF73',
  chartLineRed: '#E5254E',
  buttonPrimaryBackground: 'linear-gradient(276.02deg, #3ADDFF 5.61%, #0066FF 99.93%)',
  menuLineBorderColor: '#046CFF',
  subMenuLineBackground: 'linear-gradient(180deg, #060D1C 0%, #002043 100%)'
};

export const darkColors: Colors = {
  ...baseColors,
  background: '#121826',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#383C3F',
  backgroundFocus: '#232C31',
  backgroundContent: 'linear-gradient(270deg, #0A1428 0%, #101930 100%)',
  backgroundGradientContent: 'linear-gradient(180deg, rgba(20, 42, 50, 0) 70.83%, rgba(0, 63, 210, 0.2) 100%)',
  backgroundGradientContentFocus: 'linear-gradient(180deg, rgba(20, 42, 50, 0) 27.6%, rgba(0, 63, 210, 0.7) 100%)',
  cardBorder: '#273759',
  cardBorderSecondary: 'rgba(57, 71, 103, 0.2)',
  tertiary: '#353547',

  text: '#F4EEFF',
  textDisabled: '#787878',
  textTitle: '#7EA0DA',
  textSubtle: '#6988BE',
  textActive: '#00EEFF',
  disabled: '#524B63',
  overlay: '#121826',
  input: 'rgba(18, 24, 38, 0.5)',
  inputSecondary: '#262130',

  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  dropdownDeep: '#100C18',
  invertedContrast: '#191326',
  divider: '#4d5562',

  backgroundRING: 'linear-gradient(315deg, #FF0050 0%, #7000FF 71.44%, #0E00FF 100%)',
  backgroundKTON: 'linear-gradient(90deg, #00AF4E 0%, #00DC44 100%)',
  collapseHeaderBackground: '#394767',
  collapseBodyBackground: 'linear-gradient(270deg, rgba(17, 24, 39, 0.8) 0%, rgba(14, 20, 34, 0.8) 100%);',
  numberBackground: 'linear-gradient(270deg, #7FBE39 1.4%, #10C604 100%)',
  apostleBackground: 'linear-gradient(116.5deg, #F76B1C 16.63%, #FAD961 83.37%)',
  itemBackground: 'linear-gradient(276.02deg, #3ADDFF 5.61%, #0066FF 99.93%)',
  eventsBackground: 'linear-gradient(116.5deg, #F76B1C 16.63%, #FAD961 83.37%)',
  chartLineGreen: '#15FF73',
  chartLineRed: '#E5254E',
  buttonPrimaryBackground: 'linear-gradient(276.02deg, #3ADDFF 5.61%, #0066FF 99.93%)',
  menuLineBorderColor: '#046CFF',
  subMenuLineBackground: 'linear-gradient(180deg, #060D1C 0%, #002043 100%)'
};
