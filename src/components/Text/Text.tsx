// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled, { DefaultTheme } from 'styled-components';
import { space, typography, layout } from 'styled-system';
import getThemeValue from 'utils/getThemeValue';
import { TextProps } from './types';

interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => getThemeValue(`colors.${color}`, color)(theme);

const getFontSize = ({ fontSize, small }: TextProps) => (small ? '14px' : fontSize || '16px');

const getTextAlign = ({ center }: TextProps) => (center ? 'center' : 'initial');

const Text = styled.div<TextProps>`
  color: ${getColor};
  font-size: ${getFontSize};
  text-align: ${getTextAlign};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}
  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: 'text',
  small: false,
  center: false,
  ellipsis: false
};

export default Text;
