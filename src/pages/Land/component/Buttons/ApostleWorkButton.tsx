// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Button, useModal, SelectResourcesModal, ButtonProps } from 'components';
import { HarbergerTip } from 'components/HarbergerTip';
import { FilterApostleModal } from 'pages/Apostle/component';
import { useCurrentLand } from 'hooks/useRouterParams';
import { useApostleWorking } from 'hooks/useApostle';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTranslation } from 'react-i18next';

interface Props extends BareProps, ButtonProps {
  landTokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
  index: string;
}

const StyledButton = styled.div`
  align-items: center;
`;

export const ApostleWorkButton: React.FC<Props> = ({ className, landTokenId, children, index, ...props }) => {
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const { handleApostleWorking, pendingTx } = useApostleWorking(landId);
  const [apostle, setApostle] = useState('');

  const handleResourceSelected = useCallback(
    (resource) => {
      handleApostleWorking(apostle, landTokenId, resource.address);
    },
    [apostle, handleApostleWorking, landTokenId]
  );

  const SelectResourcesModalMemo = useMemo(() => <SelectResourcesModal title='Resources' freshId={apostle} landId={landId} handleResourceSelected={handleResourceSelected} />, [apostle, handleResourceSelected, landId]);

  const [onClickSelectResourcesModal] = useModal(SelectResourcesModalMemo, true, true, `ApostleWorkSpace-SelectResourcesModal${index}`);

  const onSelectedApostle = useCallback(
    (selected) => {
      setApostle(selected);
      onClickSelectResourcesModal();
    },
    [onClickSelectResourcesModal]
  );

  const [onClickFilterApostleModal] = useModal(<FilterApostleModal title={t('Apostle List')} landId={landId} initFilter='fresh' apostleSelected={onSelectedApostle} />, true, true, 'BreedApostleModal-FilterApostleModal');

  return (
    <StyledButton className={className}>
      <Button
        scale='sm'
        isLoading={pendingTx}
        onClick={(e) => {
          e.stopPropagation();
          onClickFilterApostleModal();
        }}
        {...props}
      >
        {children}
      </Button>
    </StyledButton>
  );
};
