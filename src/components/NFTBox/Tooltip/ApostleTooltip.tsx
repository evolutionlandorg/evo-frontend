// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { ApostleTalent } from 'hooks/backendApi';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { toPercentage } from 'utils';
import { formatNumberToFixed } from 'utils/formatBalance';
import { Flex, Box } from '../../Box';
import { StyledLabel, StyleTooltipLine } from '../styled';

export interface Props extends BareProps {
  talent: ApostleTalent;
  coldDown?: number;
}

const StyledApostleTooltip = styled.div`
  align-items: center;
  width: 120px;
`;

const ApostleTooltip: React.FC<Props> = ({ className, talent, coldDown }) => {
  const { t } = useTranslation('apostle');

  return (
    <StyledApostleTooltip className={className}>
      <Box className='space-y-1 w-full'>
        {_.isNil(coldDown) ? null : (
          <>
            <Flex flexDirection='column'>
              <StyledLabel>
                <span>{t('tooltip_Fertility')}</span> <span>{t(`cold_down_text_${coldDown}`)}</span>
              </StyledLabel>
            </Flex>
          </>
        )}
        {talent ? (
          <>
            <StyleTooltipLine />
            <Flex className='space-y-1' flexDirection='column'>
              <StyledLabel>
                <span>{t('ability_MINING')}</span> <span>{formatNumberToFixed(talent.mining_power)}</span>
              </StyledLabel>
              <StyledLabel>
                <span>{t('ability_ATK')}</span> <span>{formatNumberToFixed(talent.atk)}</span>
              </StyledLabel>
              <StyledLabel>
                <span>{t('ability_HP')}</span> <span>{formatNumberToFixed(talent.hp_limit)}</span>
              </StyledLabel>
              <StyledLabel>
                <span>{t('ability_DEF')}</span> <span>{formatNumberToFixed(talent.def)}</span>
              </StyledLabel>
              <StyledLabel>
                <span>{t('ability_CRIT')}</span> <span>{toPercentage(talent.crit)}</span>
              </StyledLabel>
            </Flex>
          </>
        ) : null}
      </Box>
    </StyledApostleTooltip>
  );
};

export default ApostleTooltip;
