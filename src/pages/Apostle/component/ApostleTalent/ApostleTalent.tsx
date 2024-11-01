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
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';

export interface Props extends BareProps {
  talent: TypeApostleTalent;
}

const StyledApostleTalent = styled(Box)`
  align-items: center;
  ${tw`w-full`}
`;

function renderTalentValue(value, valueAdd) {
  return `${value} ${valueAdd || ''}`;
}

const ApostleTalentDesktop: React.FC<Props> = ({ className, talent }) => {
  const { t } = useTranslation();

  return (
    <StyledApostleTalent className={className}>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Life')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.life, talent.life_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Mood')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.mood, talent.mood_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Strength')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.strength, talent.strength_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Agile')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.agile, talent.agile_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Finesse')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.finesse, talent.finesse_add)}</p>
        </div>
      </div>

      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('HP')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.hp, talent.hp_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Intellect')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.intellect, talent.intellect_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Lucky')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.lucky, talent.lucky_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Potential')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.potential, talent.potential_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Charm')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.charm, talent.charm_add)}</p>
        </div>
      </div>
    </StyledApostleTalent>
  );
};

const ApostleTalentMobile: React.FC<Props> = ({ className, talent }) => {
  const { t } = useTranslation();

  return (
    <StyledApostleTalent className={className}>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Life')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.life, talent.life_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Mood')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.mood, talent.mood_add)}</p>
        </div>
      </div>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Strength')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.strength, talent.strength_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Agile')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.agile, talent.agile_add)}</p>
        </div>
      </div>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Finesse')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.finesse, talent.finesse_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('HP')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.hp, talent.hp_add)}</p>
        </div>
      </div>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Intellect')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.intellect, talent.intellect_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Lucky')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.lucky, talent.lucky_add)}</p>
        </div>
      </div>
      <div className='flex w-full mb-3'>
        <div className='flex-1'>
          <StyledFontAttr>{t('Potential')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.potential, talent.potential_add)}</p>
        </div>
        <div className='flex-1'>
          <StyledFontAttr>{t('Charm')}</StyledFontAttr>
          <p className='mt-1'>{renderTalentValue(talent.charm, talent.charm_add)}</p>
        </div>
      </div>
    </StyledApostleTalent>
  );
};

const ApostleTalent: React.FC<Props> = ({ className, talent }) => {
  const { isMobile } = useMatchBreakpoints();
  return isMobile ? <ApostleTalentMobile className={className} talent={talent} /> : <ApostleTalentDesktop className={className} talent={talent} />;
};
export default ApostleTalent;
