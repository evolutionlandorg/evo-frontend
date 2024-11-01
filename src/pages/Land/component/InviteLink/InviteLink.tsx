// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { CopyText, Text, Flex } from 'components';
import { useTranslation } from 'react-i18next';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';

export interface Props extends BareProps {
  number?: string;
}

const StyledText = styled(Text)`
  align-items: center;
  color: ${({ theme }) => theme.colors.textTitle};
`;

const InviteLink: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const { isDesktop } = useMatchBreakpoints();

  return (
    <Flex className={className} justifyContent='center' alignItems='center'>
      {isDesktop && (
        <StyledText small bold mr='2'>
          {t('Invite Friends')} -
        </StyledText>
      )}
      <CopyText text={window.location.href} />
    </Flex>
  );
};

export default InviteLink;
