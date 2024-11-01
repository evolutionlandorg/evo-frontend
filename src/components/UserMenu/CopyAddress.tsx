// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { Box, CopyIcon, Flex, FlexProps, IconButton } from 'components';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface CopyAddressProps extends FlexProps {
  account: string;
}

const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
`;

const Address = styled.div`
  flex: 1;
  padding-left: 16px;
  position: relative;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-size: 16px;
    font-weight: 600;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  &::after {
    background:
      linear-gradient(to right,
      ${({ theme }) => theme.colors.background}00,
      ${({ theme }) => theme.colors.background}E6);
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`;

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  background-color: ${({ theme }) => theme.colors.contrast};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.invertedContrast};
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  opacity: 0.7;
  padding: 8px;
  position: absolute;
  right: 0;
  text-align: center;
  top: -38px;
  width: 100px;
`;

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
  const { t } = useTranslation();

  const copyAddress = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(account).then(() => displayTooltip());
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea');
      ele.value = account;
      document.body.appendChild(ele);
      ele.select();
      document.execCommand('copy');
      document.body.removeChild(ele);
      displayTooltip();
    }
  };

  function displayTooltip() {
    setIsTooltipDisplayed(true);
    setTimeout(() => {
      setIsTooltipDisplayed(false);
    }, 1000);
  }

  return (
    <Box position='relative' {...props}>
      <Wrapper>
        <Address title={account}>
          <input type='text' readOnly value={account} />
        </Address>
        <IconButton variant='text' onClick={copyAddress}>
          <CopyIcon color='primary' width='24px' />
        </IconButton>
      </Wrapper>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </Box>
  );
};

export default CopyAddress;
