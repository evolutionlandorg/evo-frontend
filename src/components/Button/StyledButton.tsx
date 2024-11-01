// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled, { DefaultTheme } from 'styled-components';
import { space, layout, variant } from 'styled-system';
import { scaleVariants, styleVariants } from './theme';
import { BaseButtonProps } from './types';

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean;
}

interface RoundedButtonProps extends ThemedButtonProps {
  noRounded?: boolean;
}

const getDisabledStyles = ({ $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.evolutionland-button--disabled {
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled,
    &.evolutionland-button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.5' : '1';
};

const StyledButton = styled.button<RoundedButtonProps>`
  align-items: center;
  border: 0;
  border-radius: ${({ noRounded }) => (noRounded ? '0px' : '16px')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.evolutionland-button--disabled):not(.evolutionland-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.evolutionland-button--disabled):not(.evolutionland-button--disabled) {
    box-shadow: none;
    opacity: 0.85;
    transform: translateY(1px);
  }

  ${getDisabledStyles}
  ${variant({
    prop: 'scale',
    variants: scaleVariants
  })}
  ${variant({
    variants: styleVariants
  })}
  ${layout}
  ${space}
`;

export default StyledButton;
