// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { cloneElement, ElementType, isValidElement } from 'react';
import StyledButton from './StyledButton';
import { ButtonProps, scales, variants } from './types';

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props;
  const internalProps = external || {};
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];

  if (isLoading) {
    classNames.push('evolutionland-button--loading');
  }

  if (isDisabled && !isLoading) {
    classNames.push('evolutionland-button--disabled');
  }

  return (
    <StyledButton $isLoading={isLoading} className={classNames.join(' ')} disabled={isDisabled} {...internalProps} {...rest}>
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: '0.5rem'
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            ml: '0.5rem'
          })}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false
};

export default Button;
