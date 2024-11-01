// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { ApostleTalent as TypeApostleTalent } from 'hooks/backendApi/types';
import { StyledFontAttr } from 'ui/styled';
import { Box } from 'components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { toPercentage } from 'utils';
import { formatNumberToFixed } from 'utils/formatBalance';

export interface Props extends BareProps {
  talent: TypeApostleTalent;
}

const StyledApostleAbility = styled(Box)`
  align-items: center;
  ${tw`w-full`}
`;

const ApostleAbility: React.FC<Props> = ({ className, talent }) => {
  const { t } = useTranslation();

  return (
    <StyledApostleAbility className={className}>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('ability_MINING')}</StyledFontAttr>
          <p className='mt-1'>{formatNumberToFixed(talent.mining_power)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('ability_ATK')}</StyledFontAttr>
          <p className='mt-1'>{formatNumberToFixed(talent.atk)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('ability_HP')}</StyledFontAttr>
          <p className='mt-1'>{formatNumberToFixed(talent.hp_limit)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('ability_DEF')}</StyledFontAttr>
          <p className='mt-1'>{formatNumberToFixed(talent.def)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('ability_CRIT')}</StyledFontAttr>
          <p className='mt-1'>{toPercentage(talent.crit)}</p>
        </div>
      </div>
    </StyledApostleAbility>
  );
};

export default ApostleAbility;
