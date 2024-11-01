// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrentLand } from 'hooks/useRouterParams';
import { Flex } from 'components';
import tw from 'twin.macro';
import cx from 'classnames';
import UserMenu from 'components/UserMenu';
import { getIsSupportByModuleName } from 'config';
import { SettingButton, SwitchButton } from './SettingsModal';
import { Logo } from './Logo';

interface Props {
  data?: unknown;
  className?: string;
  activeKey?: string;
  t: (key: string) => string;
}

interface NavConfig {
  id: string;
  href: string;
  title: string;
  icon?: string;
  target?: string;
  isHidden?: boolean;
}

interface MenuItemProps {
  item?: NavConfig;
  className?: string;
  isActive?: boolean;
  onClick?: (x: NavConfig) => void;
  t: (key: string) => string;
}

interface SubMenuProps {
  className?: string;
  config: NavConfig[];
  activeKey?: string;
  t: (key: string) => string;
}

export const StyledMenuContainer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.menuLineBorderColor};
  height: 48px;
  justify-content: space-between;
  ${tw`flex items-center w-full bg-gray-900`}
  .connectButton {
    border-radius: 0 !important;
  }
`;

export const StyledSubMenuContainer = styled.div`
  background: ${({ theme }) => theme.colors.subMenuLineBackground};
  height: 48px;
  ${tw`flex items-center w-full overflow-x-auto`}
`;

export const StyledMenuItem = styled.a<{ isActive: boolean }>`
  background: ${({ theme, isActive }) => (isActive ? theme.colors.backgroundGradientContentFocus : 'transparent')};
  ${tw`h-full flex flex-col items-center transition-colors duration-500 px-2 py-1 justify-center text-xs`}

  flex-grow: 1;
  flex-shrink: 0;

  span {
    ${tw`mt-1`}
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-grow: 0;
    ${tw`flex-row text-base px-5`}
    span {
      ${tw`ml-2`}
    }
  }
`;

const StyledNavImage = styled.img`
  height: 16px;
  width: 16px;
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 24px;
    width: 24px;
  }
`;

export const StyledSubMenuItem = styled.a`
  ${tw`h-full flex items-center px-2 transition-colors duration-500 relative text-xs`}

  flex-shrink: 0;

  img {
    ${tw`mr-2`}
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    ${tw`text-base`}

    font-weight: bold;
  }
`;

export const StyledSubMenuActive = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  ${tw`absolute bottom-0 left-0 h-1 w-full`}
`;

export const StyledMenuItemsContainer = styled.div`
  ${tw`flex items-center bg-gray-900 flex-1 overflow-x-auto`}

  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 3px;
  z-index: 10;
  padding-bottom: env(safe-area-inset-bottom);

  html[data-useragent*='TokenPocket_iOS'] & {
    padding-bottom: 45px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    position: initial;
    ${tw`w-full h-full`}
  }
`;

export const getMenuConfig = (landId): NavConfig[] => [
  {
    id: 'game',
    href: `/land/${landId}/map`,
    title: 'Game',
    icon: '/images/nav/game.png'
  },
  {
    id: 'events',
    href: `/land/${landId}/events/lottery`,
    title: 'Events',
    icon: '/images/nav/events.png'
  },
  {
    id: 'marketplace',
    href: `/land/${landId}/market/land`,
    title: 'Market',
    icon: '/images/nav/market-place.png'
  },
  {
    id: 'farm',
    href: `/land/${landId}/farm/active`,
    title: 'Farm',
    icon: '/images/nav/farm.png',
    isHidden: !getIsSupportByModuleName(landId, 'FARM')
  },
  {
    id: 'gov',
    href: `/land/${landId}/gov`,
    title: 'Governance',
    icon: '/images/nav/gov.png',
    isHidden: !getIsSupportByModuleName(landId, 'GOV')
  },
  {
    id: 'dashboard',
    href: `/land/${landId}/my/token`,
    title: 'Asset',
    icon: '/images/nav/asset.png'
  }
];

export const getGameSubMenuConfig = (landId): NavConfig[] => [
  {
    id: 'game-map',
    href: `/land/${landId}/map`,
    title: 'Map',
    icon: '/images/nav/map.png'
  },
  {
    id: 'game-furnace',
    href: `/land/${landId}/furnace`,
    title: 'Furnace',
    icon: '/images/nav/furnace.png',
    isHidden: !getIsSupportByModuleName(landId, 'FURNACE')
  }
];

export const getEventsSubMenuConfig = (landId): NavConfig[] => [
  {
    id: 'events-lottery',
    href: `/land/${landId}/events/lottery`,
    title: 'Lottery',
    icon: '/images/nav/lottery.png'
  }
];

export const getMarketPlaceSubMenuConfig = (landId): NavConfig[] => [
  {
    id: 'marketplace-land',
    href: `/land/${landId}/market/land`,
    title: 'Land',
    icon: '/images/nav/land.png'
  },
  {
    id: 'marketplace-apostle',
    href: `/land/${landId}/market/apostle`,
    title: 'Apostle',
    icon: '/images/nav/apostle.png'
  }
];

export const getFarmSubMenuConfig = (landId): NavConfig[] => [
  {
    id: 'farm-stake',
    href: `/land/${landId}/farm/stake`,
    title: 'Farm',
    icon: '/images/nav/farm.png'
  }
];

export const getGovSubMenuConfig = (landId): NavConfig[] => [
  {
    id: 'gov-details',
    href: `/land/${landId}/gov`,
    title: 'Governance',
    icon: '/images/nav/gov-sec.png'
  },
  {
    id: 'gov-forum',
    href: 'https://www.reddit.com/r/EvolutionLand/',
    title: 'Forum',
    icon: '/images/nav/forum.png',
    target: 'blank'
  }
];

export const getDashboardSubMenuConfig = (landId): NavConfig[] => [
  {
    id: 'dashboard-token',
    href: `/land/${landId}/my/token`,
    title: 'Token',
    icon: '/images/nav/token.png'
  },
  {
    id: 'dashboard-land',
    href: `/land/${landId}/my/land`,
    title: 'Land',
    icon: '/images/nav/land.png'
  },
  {
    id: 'dashboard-apostle',
    href: `/land/${landId}/my/apostle`,
    title: 'Apostle',
    icon: '/images/nav/apostle.png'
  },
  {
    id: 'dashboard-drill',
    href: `/land/${landId}/my/drill`,
    title: 'Drill',
    icon: '/images/nav/drill.png',
    isHidden: !getIsSupportByModuleName(landId, 'DRILL')
  },
  {
    id: 'dashboard-harvest',
    href: `/land/${landId}/my/harvest/land`,
    title: 'Harvest',
    icon: '/images/nav/harvest.png',
    isHidden: !getIsSupportByModuleName(landId, 'HARVEST')
  }
];

export const MenuItem: React.FC<MenuItemProps> = ({ className, item, isActive, onClick, t, ...rest }) =>
  item.target === 'blank' ? (
    <StyledMenuItem href={item.href} target='_blank' rel='noopener noreferrer' className={className} isActive={isActive}>
      {item?.icon ? <StyledNavImage alt='...' src={item.icon} /> : null}
      <span className='font-bold'>{t(item.title)}</span>
    </StyledMenuItem>
  ) : (
    <StyledMenuItem className={className} onClick={() => onClick(item)} {...rest} isActive={isActive}>
      {item?.icon ? <StyledNavImage alt='...' src={item.icon} /> : null}
      <span className='font-bold'>{t(item.title)}</span>
    </StyledMenuItem>
  );

export const SubMenuItem: React.FC<MenuItemProps> = ({ className, item, isActive, onClick, t, ...rest }) =>
  item.target === 'blank' ? (
    <StyledSubMenuItem href={item.href} target='_blank' rel='noopener noreferrer' className={className}>
      {item?.icon ? <StyledNavImage alt='...' src={item.icon} /> : null}
      <span>{t(item.title)}</span>
      {isActive ? <StyledSubMenuActive /> : null}
    </StyledSubMenuItem>
  ) : (
    <StyledSubMenuItem className={className} onClick={() => onClick(item)} {...rest}>
      {item?.icon ? <StyledNavImage alt='...' src={item.icon} /> : null}
      <span>{t(item.title)}</span>
      {isActive ? <StyledSubMenuActive /> : null}
    </StyledSubMenuItem>
  );

export const Menu: React.FC<Props> = ({ className, activeKey, t }) => {
  const landId = useCurrentLand();
  const history = useHistory();
  const menuConfig = useMemo(() => getMenuConfig(landId), [landId]);

  const handleTab = useCallback(
    (nav) => {
      if (nav?.href) {
        history.push(nav.href);
      }
    },
    [history]
  );

  return (
    <StyledMenuContainer className={className}>
      <Logo />
      <StyledMenuItemsContainer>
        {menuConfig
          .filter((item) => !item.isHidden)
          .map((nav) => (
            <MenuItem onClick={handleTab} isActive={activeKey === nav.id} className={cx({ 'bg-gray-700': activeKey === nav.id, 'cursor-pointer': nav.href })} key={nav.id} item={nav} t={t} />
          ))}
      </StyledMenuItemsContainer>
      <Flex justifyContent='center' alignItems='center'>
        <SwitchButton history={history} />
        <SettingButton />
        <UserMenu />
      </Flex>
    </StyledMenuContainer>
  );
};

export const SubMenu: React.FC<SubMenuProps> = ({ className, config, activeKey, t }) => {
  const history = useHistory();

  const handleTab = useCallback(
    (nav) => {
      if (nav?.href) {
        history.push(nav.href);
      }
    },
    [history]
  );

  return (
    <StyledSubMenuContainer className={className}>
      {config
        .filter((item) => !item.isHidden)
        .map((nav) => (
          <SubMenuItem onClick={handleTab} isActive={activeKey === nav.id} className={cx({ 'cursor-pointer': nav.href })} key={nav.id} item={nav} t={t} />
        ))}
    </StyledSubMenuContainer>
  );
};
