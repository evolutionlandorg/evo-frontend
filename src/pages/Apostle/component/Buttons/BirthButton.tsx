// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { ButtonProps } from 'components/Button';
import { Button, useModal } from 'components';
import { useTranslation } from 'react-i18next';
import { BirthApostleModal } from '../BirthApostleModal';

interface Props extends BareProps, ButtonProps {
  motherTokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledBirthButton = styled.div`
  align-items: center;
`;

export const BirthButton: React.FC<Props> = ({ className, landId, motherTokenId, ...rest }) => {
  const { t } = useTranslation('apostle');

  const [onClickBirthApostle] = useModal(<BirthApostleModal title={t('Birth Apostle')} landId={landId} motherTokenId={motherTokenId} />);

  return (
    <StyledBirthButton className={className}>
      <Button
        scale='sm'
        onClick={(e) => {
          e.stopPropagation();
          onClickBirthApostle();
        }}
        {...rest}
      >
        {t('Birth Claim')}
      </Button>
    </StyledBirthButton>
  );
};
