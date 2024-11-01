// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback, useMemo } from 'react';
import { BareProps } from 'components/types';
import { useModal, useModal2, SelectResourcesModal, ButtonProps, DrillBoxMiniEmpty, Button } from 'components';
import { useCurrentLand } from 'hooks/useRouterParams';
import { useDrillWork } from 'hooks/useDrill';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { FilterDrillModal, ApproveDrillModal } from 'pages/Drill/component';
import { useTranslation } from 'react-i18next';
import { Web3Provider } from '@ethersproject/providers';
import { useIllustratedList } from 'store/illustrated/hooks';
import { getIllustratedById } from 'pages/Drill/utils';
import { isUndefined } from 'lodash';
import useToast from 'hooks/useToast';

interface Props extends BareProps, ButtonProps {
  landId: SUPPORTED_LANDS_INDEX;
  provider: Web3Provider;
  landTokenId: string;
  index: number;
  boxSize?: number;
  grabFurnaceId?: number;
  withoutUI?: boolean;
  ignoreCheck?: boolean;
}

export const DrillWorkButtonWithUI: React.FC<Props> = ({ className, grabFurnaceId, landTokenId, children, provider, index, boxSize, withoutUI, ignoreCheck, ...props }) => {
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const { toastError } = useToast();
  const { handleDrillWork, pendingTx } = useDrillWork(landId);
  const [drillTokenId, setDrillTokenId] = useState('');
  const [illustratedList, fetchIllustratedList] = useIllustratedList();

  const drillContractAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP');
  const landResourceContractAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'LAND_RESOURCE');

  const handleResourceSelected = useCallback(
    (resource) => {
      handleDrillWork(landTokenId, drillContractAddress, drillTokenId, resource.address, index);
    },
    [handleDrillWork, landTokenId, drillContractAddress, drillTokenId, index]
  );

  const SelectResourcesModalMemo = useMemo(() => <SelectResourcesModal title='Resources' freshId={drillTokenId} landId={landId} handleResourceSelected={handleResourceSelected} />, [drillTokenId, landId, handleResourceSelected]);
  const ApproveDrillModalMemo = useMemo(() => <ApproveDrillModal title='Approve Drill' landId={landId} tokenId={drillTokenId} spenderAddess={landResourceContractAddress} />, [drillTokenId, landId, landResourceContractAddress]);
  const [onClickSelectResourcesModal] = useModal2(SelectResourcesModalMemo, true, true, `DrillWorkSpace-SelectResourcesModal${index}`);
  const [onClickApproveDrillModal] = useModal2(ApproveDrillModalMemo, true, true, `DrillWorkSpace-ApproveDrillModal${index}`);

  const onSelectedApostle = useCallback(
    async (selected, formulaId, onDismiss) => {
      setDrillTokenId(selected);
      if (!isUndefined(grabFurnaceId) && !ignoreCheck) {
        const selectedIllustrated = getIllustratedById(illustratedList, formulaId);
        const GrabIllustrated = getIllustratedById(illustratedList, grabFurnaceId);
        if (GrabIllustrated.class > selectedIllustrated.class || (GrabIllustrated.class === selectedIllustrated.class && GrabIllustrated.grade >= selectedIllustrated.grade)) {
          toastError('Error', t(`This drill's class/level is Not higher target one, couldn't grab!`));
          return;
        }
      }

      const result = await bundleApi[landId].erc721.erc721IsApprovedOrOwner(provider, landResourceContractAddress, drillContractAddress, selected);
      if (!result) {
        onClickApproveDrillModal();
        return;
      }
      onDismiss();
      onClickSelectResourcesModal();
    },
    [drillContractAddress, grabFurnaceId, ignoreCheck, illustratedList, landId, landResourceContractAddress, onClickApproveDrillModal, onClickSelectResourcesModal, provider, t, toastError]
  );

  const [onClickFilterDrillModal] = useModal(<FilterDrillModal title={t('My Drill List')} landId={landId} drillSelected={onSelectedApostle} initFilter='fresh' />, true, true, 'DrillWorkButton-FilterLandModal');

  if (withoutUI) {
    return (
      <Button
        className={className}
        scale='sm'
        isLoading={pendingTx}
        onClick={(e) => {
          e.stopPropagation();
          pendingTx || onClickFilterDrillModal();
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <DrillBoxMiniEmpty
      boxSize={boxSize}
      className={className}
      imageOnClick={() => {
        pendingTx || onClickFilterDrillModal();
      }}
      hasAdd
      {...props}
    />
  );
};
