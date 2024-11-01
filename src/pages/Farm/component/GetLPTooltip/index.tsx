// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { OpenNewIcon } from 'components';
import { useTooltip } from 'hooks/useTooltip';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledFontNormal } from 'ui/styled';

const Wrapper = styled(StyledFontNormal)`
  display: inline-flex;
`;

const Goto = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  margin-left: 8px;

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }

  :hover {
    text-decoration: underline;
  }
`;

interface GetLPTooltipProps {
  url: string;
}

const GetLPTooltip: FC<GetLPTooltipProps> = ({ children, url }) => {
  const { t } = useTranslation(['farm']);
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<>{t('farm:Get LP Tip')}</>, { placement: 'auto', trigger: 'hover' });

  return (
    <Wrapper>
      {children}
      <Goto ref={targetRef} target='_blank' href={url}>
        {t('farm:Get LP')}
        <OpenNewIcon width='16px' ml='4px' />
        {tooltipVisible && tooltip}
      </Goto>
    </Wrapper>
  );
};

export default GetLPTooltip;
