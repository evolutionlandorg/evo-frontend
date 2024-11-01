// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import BigNumber from 'bignumber.js';
import { ApostleBoxMini, ApostleBoxMiniEmpty, Flex, Text } from 'components';
import type { Apostle } from 'hooks/backendApi/types';
import { StopWorkingApostleButton } from 'pages/Apostle/component';
import { useCurrentLand } from 'hooks/useRouterParams';
import { ApostleWorkButtonWithUI } from 'pages/Land/component';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useTranslation } from 'react-i18next';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { History } from 'history';
import { navigateToDetail } from 'api/utils';

export interface Props extends BareProps {
  apostle: Apostle;
  landTokenId?: string;
  showFooter?: boolean;
  slotIndex: string;
  boxSize?: number;
  history: History;
}

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 15px;
  width: 15px;
`;

const ApostleSlot: React.FC<Props> = ({ className, apostle, landTokenId, showFooter, slotIndex, boxSize, history }) => {
  const landId = useCurrentLand();
  const { t } = useTranslation();
  const { library } = useActiveWeb3React(landId);

  const navigateToLand = () => {
    navigateToDetail(history, landId, 'apostle', apostle.token_id);
  };

  return (
    <Flex className={className}>
      {apostle ? (
        <Flex flexDirection='column' alignItems='center'>
          <ApostleBoxMini number={`${apostle.token_index}`} subtitle='' imageUrl={apostle.apostle_picture} boxSize={boxSize} imageOnClick={navigateToLand} pointer apostle={apostle} hasTooltip />
          <Flex className='justify-center items-center mt-2'>
            <StyledTokenImage src={`/images/token/${apostle.dig_element}.svg`} alt={`${apostle.dig_element} token icon`} />
            <Text small className='ml-1'>
              {getFullDisplayBalance(new BigNumber(apostle.strength), 0, 2)}
            </Text>
          </Flex>
          {showFooter ? (
            <StopWorkingApostleButton scale='xs' mt='2' landId={landId} tokenId={apostle.token_id}>
              {t('Stop')}
            </StopWorkingApostleButton>
          ) : null}
        </Flex>
      ) : (
        <>
          {showFooter ? (
            <ApostleWorkButtonWithUI boxSize={boxSize} provider={library} index={slotIndex} landTokenId={landTokenId} landId={landId} />
          ) : (
            <Flex flexDirection='column'>
              <ApostleBoxMiniEmpty boxSize={boxSize} className='h-full' />
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default React.memo<Props>(ApostleSlot);
