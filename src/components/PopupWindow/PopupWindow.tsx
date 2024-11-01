// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Box, BoxProps, Flex } from 'components/Box';
import { PopupHeaderProps } from './types';
import CloseImage from './images/close.svg';

const StyledBoxWindow = styled(Box)`
  ${tw`bg-modal bg-opacity-90 my-14 rounded-xl`}

  /*
    height: calc(100vh - 60px);
    margin-top: 30px; */

  /* overflow: auto; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
`;

const StyledPopupFlex = styled(Flex)<{ color: string }>`
  background: ${({ theme, color }) => theme.popupWindow[color || 'backgroundBlue']};

  .PopupHeader--title {
    ${tw`font-bold mx-2 text-lg`}
  }

  .close-box {
    padding: 5px;

    img {
      height: 30px;
      width: 30px;
    }
  }
`;

export const PopupWindow: React.FC<BoxProps> = ({ children, ...props }) => (
  <StyledBoxWindow px='0' mx='auto' maxWidth='1200px' {...props}>
    {children}
  </StyledBoxWindow>
);

export const PopupHeader: React.FC<PopupHeaderProps> = ({ className, children, title, color, onClose, ...props }) => (
  <StyledPopupFlex {...props} color={color} justifyContent='space-between' alignItems='center' className={className}>
    <p className='PopupHeader--title'>{title}</p>
    <div
      className='close-box'
      onClick={() => {
        onClose && onClose();
      }}
    >
      <img src={CloseImage} alt='close' />
    </div>
  </StyledPopupFlex>
);
