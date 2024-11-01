// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';
import { CopyIcon } from '../Svg';

interface Props {
  toCopy: string;
  color?: string;
}

const StyleButton = styled(Text).attrs({ role: 'button' })<{ color: string }>`
  align-items: center;
  color: ${({ theme, color }) => theme.colors[color]};
  display: flex;
  position: relative;
`;

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  background-color: #ccc;
  border-radius: 16px;
  bottom: -22px;
  color: #fff;
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'block' : 'none')};
  left: 0;
  opacity: 0.7;
  position: absolute;
  right: 0;
  text-align: center;
`;

const CopyToClipboard: React.FC<Props> = ({ toCopy, color = 'primary', children, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);

  const copyToClipboardWithCommand = (content: string) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  function displayTooltip() {
    setIsTooltipDisplayed(true);
    setTimeout(() => {
      setIsTooltipDisplayed(false);
    }, 1000);
  }

  return (
    <StyleButton
      small
      bold
      color={color}
      onClick={() => {
        if (navigator.clipboard && navigator.permissions) {
          navigator.clipboard.writeText(toCopy).then(() => displayTooltip());
        } else if (document.queryCommandSupported('copy')) {
          copyToClipboardWithCommand(toCopy);
          displayTooltip();
        }
      }}
      {...props}
    >
      {children}
      <CopyIcon width='20px' color={color} ml='4px' />
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </StyleButton>
  );
};

export default CopyToClipboard;
