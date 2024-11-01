// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { DrillBoxMiniEmpty, Flex } from 'components';
import type { DrillLandEquip } from 'hooks/backendApi/types';
import { useCurrentLand } from 'hooks/useRouterParams';
import { IllustratedBox, StopDrillWorkingButton } from 'pages/Drill/component';
import { useTranslation } from 'react-i18next';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { isSameAddress } from 'utils/address';
import { useDrillInCooldown } from 'hooks/useDrill';
import { navigateToDetail } from 'api/utils';
import { History } from 'history';
import { DrillWorkButtonWithUI } from '../Buttons';
import DrillCooldownMask from './DrillCooldownMask';

export interface Props extends BareProps {
  drill: DrillLandEquip;
  landTokenId?: string;
  isLandOwner: boolean;
  showFooter?: boolean;
  onClickHandler?: (x: DrillLandEquip) => void;
  slotIndex: number;
  boxSize?: number;
  history: History;
}

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 15px;
  width: 15px;
`;

const DrillSlot: React.FC<Props> = ({ className, drill, isLandOwner, landTokenId, showFooter, slotIndex, history, boxSize }) => {
  const landId = useCurrentLand();
  const { t } = useTranslation();
  const { library, account } = useActiveWeb3React(landId);
  const isDrillOwner = useMemo(() => isSameAddress(account, drill?.owner), [account, drill?.owner]);
  const { protectionPeriodEndTime, isInCooldown } = useDrillInCooldown(drill?.equip_time, drill?.formula_id);

  const canStop = isDrillOwner;
  const navigateToLand = () => {
    navigateToDetail(history, landId, 'drill', drill.drill_token_id);
  };

  return (
    <Flex className={className}>
      {drill ? (
        <Flex flexDirection='column' alignItems='center'>
          <DrillCooldownMask small={boxSize < 80} equipTime={drill.equip_time} formulaId={drill.formula_id}>
            <IllustratedBox boxSize={boxSize} landId={landId} formulaId={drill.formula_id} mini imageOnClick={navigateToLand} pointer />
          </DrillCooldownMask>
          <Flex className='justify-center items-center mt-2'>
            <StyledTokenImage src={`/images/token/${drill.resource}.svg`} alt={`${drill.resource} token icon`} />
            {/* <Text small className="ml-1">{getFullDisplayBalance(new BigNumber(drill.strength), 0, 2)}</Text> */}
          </Flex>
          {showFooter ? (
            <>
              {canStop && (
                <StopDrillWorkingButton scale='xs' mt='2' landId={landId} landTokenId={landTokenId} slotIndex={slotIndex}>
                  {t('Stop')}
                </StopDrillWorkingButton>
              )}
              <DrillWorkButtonWithUI scale='xs' mt='2' withoutUI disabled={isInCooldown} ignoreCheck={isLandOwner} grabFurnaceId={drill?.formula_id} boxSize={boxSize} provider={library} index={slotIndex} landTokenId={landTokenId} landId={landId}>
                {t('Grab')}
              </DrillWorkButtonWithUI>
            </>
          ) : null}
        </Flex>
      ) : (
        <>
          {showFooter ? (
            <DrillWorkButtonWithUI boxSize={boxSize} provider={library} index={slotIndex} landTokenId={landTokenId} landId={landId} />
          ) : (
            <Flex flexDirection='column'>
              <DrillBoxMiniEmpty boxSize={boxSize} className='h-full' />
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default React.memo<Props>(DrillSlot);
