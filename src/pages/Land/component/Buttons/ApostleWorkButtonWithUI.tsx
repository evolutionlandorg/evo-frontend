// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback, useMemo } from 'react';
import { BareProps } from 'components/types';
import { useModal, useModal2, SelectResourcesModal, ButtonProps, ApostleBoxMiniEmpty } from 'components';
import { HarbergerTip } from 'components/HarbergerTip';
import { FilterApostleModal, ApproveApostleModal } from 'pages/Apostle/component';
import { useCurrentLand } from 'hooks/useRouterParams';
import { useApostleWorking } from 'hooks/useApostle';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Web3Provider } from '@ethersproject/providers';

interface Props extends BareProps, ButtonProps {
  landTokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
  provider: Web3Provider;
  index: string;
  boxSize?: number;
}

export const ApostleWorkButtonWithUI: React.FC<Props> = ({ className, landTokenId, children, provider, index, boxSize, ...props }) => {
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const { handleApostleWorking, pendingTx } = useApostleWorking(landId);
  const [apostle, setApostle] = useState('');
  // const apostleContractAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP');
  // const landResourceContractAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'LAND_RESOURCE');

  const handleResourceSelected = useCallback(
    (resource) => {
      handleApostleWorking(apostle, landTokenId, resource.address);
    },
    [apostle, handleApostleWorking, landTokenId]
  );

  const SelectResourcesModalMemo = useMemo(() => <SelectResourcesModal title={t('Resources')} freshId={apostle} landId={landId} handleResourceSelected={handleResourceSelected} />, [apostle, handleResourceSelected, landId, t]);
  // const ApproveApostleModalMemo = useMemo(() => <ApproveApostleModal title="Approve Apostle" landId={landId} tokenId={apostle} spenderAddess={landResourceContractAddress}/>, [apostle, landId, landResourceContractAddress])

  const [onClickSelectResourcesModal] = useModal(SelectResourcesModalMemo, true, true, `ApostleWorkSpace-SelectResourcesModal${index}`);
  // const [onClickApproveApostleModal] = useModal2(ApproveApostleModalMemo, true, true, `ApostleWorkSpace-ApproveApostleModal${index}`);

  const onSelectedApostle = useCallback(
    async (selected) => {
      setApostle(selected);
      // const result = await bundleApi[landId].erc721.erc721IsApprovedOrOwner(provider, landResourceContractAddress, apostleContractAddress, selected);
      // if(!false) {
      //   onClickApproveApostleModal();
      //   return;
      // }

      onClickSelectResourcesModal();
    },
    [onClickSelectResourcesModal]
  );

  const [onClickFilterApostleModal] = useModal(<FilterApostleModal title={t('Apostle List')} landId={landId} initFilter='fresh' apostleSelected={onSelectedApostle} />, true, true, 'BreedApostleModal-FilterApostleModal');

  return (
    <ApostleBoxMiniEmpty
      {...props}
      boxSize={boxSize}
      className={className}
      imageOnClick={() => {
        pendingTx || onClickFilterApostleModal();
      }}
      hasAdd
    />
  );
};
