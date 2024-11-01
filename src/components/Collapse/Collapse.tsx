// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import tw from 'twin.macro';
import IconArrow from './arrow.svg';
import { Flex } from '../Box';

export interface Props extends BareProps {
  header: React.ReactNode;
}

const StyledCollapse = styled.div<{ isOpen: boolean }>`
  align-items: center;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '53px')};
  overflow: ${({ isOpen }) => (isOpen ? 'auto' : 'hidden')};
  ${tw`mb-2`}

  transition-duration: 0.5s;
  background: ${({ theme }) => theme.colors.collapseBodyBackground};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 1.25rem;

  ${({ theme }) => theme.mediaQueries.md} {
    height: ${({ isOpen }) => (isOpen ? 'auto' : '77px')};
  }
`;

const StyledHeader = styled(Flex)`
  background: ${({ theme }) => theme.colors.collapseHeaderBackground}b2;
  border-radius: 1.1rem;
  height: 52px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 76px;
  }
`;

const StyledHeaderContent = styled.div`
  flex: 1;
`;

const StyledHeaderArrow = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  padding: 10px;
  transform: rotate(${({ isOpen }) => (isOpen ? '0deg' : '180deg')});
  transition-duration: 0.5s;

  img {
    height: 14px;
    width: 22px;
  }
`;

const Collapse: React.FC<Props> = ({ className, header, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <StyledCollapse className={className} isOpen={open}>
      <StyledHeader alignItems='center'>
        <StyledHeaderContent>{header}</StyledHeaderContent>
        <StyledHeaderArrow isOpen={open} onClick={toggleOpen}>
          <img src={IconArrow} alt='arrow' />
        </StyledHeaderArrow>
      </StyledHeader>
      {children}
    </StyledCollapse>
  );
};

export default Collapse;
