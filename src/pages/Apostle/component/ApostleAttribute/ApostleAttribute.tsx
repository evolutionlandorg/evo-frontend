// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled, { useTheme } from 'styled-components';
import tw from 'twin.macro';
import { BareProps } from 'components/types';
import type { ApostleAttributes } from 'hooks/backendApi/types';
import { useTranslation } from 'react-i18next';
import ApostleAttributeItem from './ApostleAttributeItem';

export interface Props extends BareProps {
  attributes: ApostleAttributes;
}

const StyledApsotleAttribute = styled.div`
  align-items: center;
  ${tw`grid grid-cols-1 gap-y-4`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`grid-cols-2`}
  }
`;

const ApostleAttribute: React.FC<Props> = ({ className, attributes }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <StyledApsotleAttribute className={className}>
      <ApostleAttributeItem title={t('Profile')} iconUrl='/images/apostle/attribute/profile.png' attribute={attributes.profile} />
      <ApostleAttributeItem title={t('Profile Color')} iconUrl='/images/apostle/attribute/profile.png' attribute={attributes.profile_color} bgColor={theme.colors.apostleBackground} />

      <ApostleAttributeItem title={t('Feature')} iconUrl='/images/apostle/attribute/feature.png' attribute={attributes.feature} />
      <ApostleAttributeItem title={t('Feature Color')} iconUrl='/images/apostle/attribute/feature.png' attribute={attributes.feature_color} bgColor={theme.colors.itemBackground} />

      <ApostleAttributeItem title={t('Hair')} iconUrl='/images/apostle/attribute/hair.png' attribute={attributes.hair} />
      <ApostleAttributeItem title={t('Hair Color')} iconUrl='/images/apostle/attribute/hair.png' attribute={attributes.hair_color} bgColor={theme.colors.itemBackground} />

      <ApostleAttributeItem title={t('Eye')} iconUrl='/images/apostle/attribute/eye.png' attribute={attributes.eye} />
      <ApostleAttributeItem title={t('Eye Color')} iconUrl='/images/apostle/attribute/eye.png' attribute={attributes.eye_color} bgColor={theme.colors.numberBackground} />

      <ApostleAttributeItem title={t('Expression')} iconUrl='/images/apostle/attribute/expression.png' attribute={attributes.expression} />
      <ApostleAttributeItem title={t('Surroundings')} iconUrl='/images/apostle/attribute/surroundings.png' attribute={attributes.surroundings} bgColor={theme.colors.collapseHeaderBackground} />
    </StyledApsotleAttribute>
  );
};

export default ApostleAttribute;
