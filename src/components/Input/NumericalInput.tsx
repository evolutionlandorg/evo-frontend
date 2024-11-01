// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { escapeRegExp } from '../../utils';
import { InputProps, scales } from './types';

interface StyledInputProps extends InputProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  if (isSuccess) {
    return theme.shadows.success;
  }

  return theme.shadows.inset;
};

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return '32px';
    case scales.LG:
      return '48px';
    case scales.MD:
    default:
      return '40px';
  }
};

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  appearance: textfield;
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 20px;
  box-shadow: ${getBoxShadow};
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.text)};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  flex: 1 1 auto;
  font-size: 16px;
  font-weight: 500;
  height: ${getHeight};
  outline: 0;
  overflow: hidden;
  padding: 0 16px;
  position: relative;
  text-align: ${({ align }) => align && align};
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
  width: 100%;

  ::-webkit-search-decoration {
    appearance: none;
  }

  [type='number'] {
    appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const Input = React.memo(
  ({
    value,
    onUserInput,
    placeholder = '0.0',
    minLength = 1,
    maxLength = 79,
    pattern = '^[0-9]*[.,]?[0-9]*$',
    title = 'Token Amount',
    ...rest
  }: {
    value: string | number;
    onUserInput: (input: string) => void;
    error?: boolean;
    fontSize?: string;
    align?: 'right' | 'left';
    title?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    const enforcer = (nextUserInput: string) => {
      if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
        onUserInput(nextUserInput);
      }
    };

    return (
      <StyledInput
        {...rest}
        value={value}
        onChange={(event) => {
          // replace commas with periods, because we exclusively uses period as the decimal separator
          enforcer(event.target.value.replace(/,/g, '.'));
        }}
        // universal input options
        inputMode='decimal'
        title={title}
        autoComplete='off'
        autoCorrect='off'
        // text-specific options
        type='text'
        pattern={pattern}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        spellCheck='false'
      />
    );
  }
);

export default Input;
