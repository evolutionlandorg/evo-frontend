// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { BareProps } from 'components/types';
import { ApostleWorkInfo as TypeApostleWorkInfo } from 'hooks/backendApi/types';
import { StyledFontAttr } from 'ui/styled';
import { Box } from 'components';
import { getLandCoordinates } from 'utils/land';
import { getDisplayBalanceWithFixd } from 'utils/formatBalance';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';

export interface Props extends BareProps {
  work: TypeApostleWorkInfo;
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledApostleWorkInfo = styled(Box)`
  align-items: center;
  ${tw`w-full`}
`;

const ApostleWorkInfo: React.FC<Props> = ({ className, work, landId }) => {
  const { t } = useTranslation();
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  return (
    <StyledApostleWorkInfo className={className}>
      <div className='flex w-full mb-3'>
        {/* <div className='flex-1'>
          <StyledFontAttr>{t('Status')}</StyledFontAttr>
          <p className='mt-1'>...todo</p>
        </div> */}
        <div className='flex-1'>
          <StyledFontAttr>{t('Strength')}</StyledFontAttr>
          <p className='mt-1'>
            {getDisplayBalanceWithFixd(new BigNumber(work.strength), 0, 4)} {work.dig_element.toUpperCase()} / DAY
          </p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>
            {t('Land')}
            {t('Location')}
          </StyledFontAttr>
          <p className='mt-1'>
            No.{work.land_id} ({getLandCoordinates(work.lon, work.lat)})
          </p>
        </div>
      </div>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Rent')}</StyledFontAttr>
          <p className='mt-1'>
            {work.price} {RING.symbol}
          </p>
        </div>
      </div>
    </StyledApostleWorkInfo>
  );
};

export default ApostleWorkInfo;
