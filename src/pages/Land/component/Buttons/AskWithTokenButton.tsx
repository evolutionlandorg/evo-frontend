// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { BareProps } from 'components/types';
import { Button, ButtonProps, useModal } from 'components';
import { useTranslation } from 'react-i18next';
import { SellLandModal } from '../SellLandModal';

interface Props extends BareProps, ButtonProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

export const AskWithTokenButton: React.FC<Props> = ({ className, landId, tokenId, children, ...props }) => {
  const { t } = useTranslation();
  const [onClickSellLand] = useModal(<SellLandModal title={t('Sell Land')} landId={landId} tokenId={tokenId} />);

  return (
    <Button
      className={className}
      scale='sm'
      onClick={(e) => {
        e.stopPropagation();
        onClickSellLand();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
