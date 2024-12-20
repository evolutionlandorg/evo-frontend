// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { Box, Flex } from 'components';
import { ChevronDownIcon } from 'components/Svg';
import tw from 'twin.macro';
import { bundleApi } from 'api';
import { UserMenuProps, variants } from './types';
import { UserMenuItem } from './styles';

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 16px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
`;

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.backgroundFocus};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${tw`rounded-md`}

  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 2px 2px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 2px 2px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({ landId, account, text, avatarSrc, variant = variants.DEFAULT, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const displayAddress = bundleApi[landId].toDisplayAddress(account);
  const accountEllipsis = account ? `${displayAddress.substring(0, 6)}...${displayAddress.substring(displayAddress.length - 4)}` : null;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }]
  });

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener('mouseenter', showDropdownMenu);
    targetRef?.addEventListener('mouseleave', hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener('mouseenter', showDropdownMenu);
      targetRef?.removeEventListener('mouseleave', hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <Flex className='mx-2' alignItems='center' height='100%' ref={setTargetRef} {...props}>
      <StyledUserMenu
        onTouchStart={() => {
          setIsOpen((s) => !s);
        }}
      >
        {/* <MenuIcon avatarSrc={avatarSrc} variant={variant} /> */}
        <LabelText title={text || account}>{text || accountEllipsis}</LabelText>
        <ChevronDownIcon color='text' width='24px' />
      </StyledUserMenu>
      <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
        <Box onClick={() => setIsOpen(false)}>{children}</Box>
      </Menu>
    </Flex>
  );
};

export default UserMenu;
