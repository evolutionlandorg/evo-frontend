// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { Box, CopyIcon, Flex, FlexProps, IconButton } from 'components';
import styled from 'styled-components';

interface CopyTextProps extends FlexProps {
  text: string;
}

const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
`;

const StyledText = styled.div`
  flex: 1;
  padding-left: 16px;
  position: relative;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    font-size: 13px;
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

const CopyText: React.FC<CopyTextProps> = ({ text, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);

  const copyText = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(text).then(() => displayTooltip());
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea');
      ele.value = text;
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
        <StyledText title={text}>
          <input type='text' readOnly value={text} />
        </StyledText>
        <IconButton variant='text' onClick={copyText} scale='sm'>
          <CopyIcon color='primary' width='15px' />
        </IconButton>
      </Wrapper>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </Box>
  );
};

export default CopyText;
