// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  nav: string;
};

export type Colors = {
  // Base
  primary: string;
  primaryBright: string;
  primaryDark: string;
  secondary: string;
  success: string;
  failure: string;
  warning: string;

  // Additional
  background: string; // 全局页面底色
  backgroundDisabled: string;
  backgroundAlt: string;
  backgroundFocus: string;
  backgroundContent: string; // 全局模块背景
  backgroundGradientContent: string; // 全局渐变颜色模块
  backgroundGradientContentFocus: string; // 全局渐变颜色模块-选中
  cardBorder: string; // 全局内容框描边颜色
  cardBorderSecondary: string; // 全局模块描边颜色
  tertiary: string;
  text: string;
  textDisabled: string; // 全局文字不可选
  textActive: string;
  textTitle: string; // 文字大标题颜色
  textSubtle: string; // 全局小标题字体颜色
  disabled: string;

  overlay: string;
  input: string;
  inputSecondary: string;

  contrast: string;
  dropdown: string;
  dropdownDeep: string;
  invertedContrast: string;

  backgroundRING: string;
  backgroundKTON: string;

  divider: string;
  collapseHeaderBackground: string;
  collapseBodyBackground: string; // 全局列表内容背景颜色
  numberBackground: string; // 编号渐变
  apostleBackground: string; // 使徒主题色
  eventsBackground: string; // 活动主题色
  itemBackground: string; // 道具主题色
  chartLineGreen: string; // 图表线条 绿色
  chartLineRed: string; // 图表线条 红色
  buttonPrimaryBackground: string; // primary Button 背景色
  menuLineBorderColor: string; // 导航下边框颜色
  subMenuLineBackground: string; // 二级菜单背景色
};

export type ZIndices = {
  dropdown: number;
  modal: number;
  modal2: number;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
  tooltip: string;
};

export type Radii = {
  small: string;
  default: string;
  card: string;
  circle: string;
};
