// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Erc721ApproveButton, useModal } from 'components';
import { useCurrentLand } from 'hooks/useRouterParams';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { FilterDrillModal } from 'pages/Drill/component';
import { getDrillImage, getIllustratedById } from 'pages/Drill/utils';
import { Illustrated, useGetDrill, useGetIllustratedList } from 'hooks/backendApi';
import { bundleApi } from 'api';
import { useBankUniswapGetDerivedPairInfo } from 'hooks/useBank';
import { extendLandId } from 'utils';
import { getTokenResourceList } from 'utils/tokenList';
import { useFurnaceDisenchantProps } from 'hooks/useFurnace';
import { Stove, StoveSlotProps } from '../component/Stove';
import { PreviewItem, PreviewPanel } from '../component/PreviewPanel';
import { Container } from '../component/Container';

function DrillDismantle() {
  const landId = useCurrentLand();
  const { library, account } = useActiveWeb3React(landId);
  const { t } = useTranslation();

  const { data: getBlueprintListResponse } = useGetIllustratedList({ landId });
  const blueprintList = getBlueprintListResponse?.data;

  const { handleFurnaceDisenchantProps, pendingTx: isDismantling } = useFurnaceDisenchantProps(landId);

  const furnaceItemBaseContractAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), 'FURNACE_ITEM_BASE'), [landId]);
  const objectOwnerShipContractAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP'), [landId]);

  const [originTokenId, setOriginTokenId] = useState('');
  const { data: originDrillInfo } = useGetDrill({ landId, tokenId: originTokenId });

  const parseDrill = useCallback(
    (info: Illustrated) => {
      if (!info) {
        return null;
      }
      const { grade: rarity, class: level } = info;
      const { name } = blueprintList.find(({ grade, class: blueprintLevel }) => grade === info.grade && blueprintLevel === 0);

      return {
        ...info,
        level,
        rarity,
        name: `${t(name)} ${level ? `+${level}` : ''}`
      };
    },
    [blueprintList, t]
  );
  const originDrill = useMemo(() => parseDrill(getIllustratedById(blueprintList, originDrillInfo?.formula_id)), [parseDrill, blueprintList, originDrillInfo?.formula_id]);
  const targetDrill = useMemo(() => parseDrill(getIllustratedById(blueprintList, originDrill?.major_id)), [parseDrill, blueprintList, originDrill?.major_id]);

  const token = useMemo(() => getTokenResourceList(landId).find((item) => item.symbol.toLocaleLowerCase() === originDrillInfo?.prefer), [originDrillInfo?.prefer, landId]);
  const pairToken = useBankUniswapGetDerivedPairInfo(landId, token, {
    address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
    symbol: 'RING',
    decimals: 18
  });

  const [slots, setSlots] = useState<StoveSlotProps[]>([]);
  const [previewData, setPreviewData] = useState<PreviewItem[]>([]);

  const [disPlayerFilterDrillModal] = useModal(
    <FilterDrillModal
      drillClass={['1', '2']}
      title={t('furnace:Choose your drill')}
      landId={landId}
      initFilter='fresh'
      drillSelected={(tokenId, formulaId, onDismiss) => {
        setOriginTokenId(tokenId);
        onDismiss();
      }}
    />,
    true,
    true,
    'DisassembleDrill'
  );

  const convertToSlots = useCallback(() => {
    if (!originDrill || !targetDrill || !pairToken) {
      return;
    }
    const { name, class: type, grade } = targetDrill;
    const { minor } = originDrill;
    const { element, LP } = minor;
    const { token0, token1 } = pairToken;

    const hasElement = element !== '0';

    setSlots([
      {
        tips: [name, 1],
        src: getDrillImage(type, grade, 'png')
      },
      {
        tips: [hasElement ? token.symbol.toUpperCase() : `${token0.symbol}-${token1.symbol} LP`, hasElement ? element : LP],
        src: `/images/token/${token.symbol.toLowerCase()}.svg`
      }
    ]);
  }, [originDrill, targetDrill, pairToken, token?.symbol]);

  const convertToPreviewData = useCallback(() => {
    const { productivity = [], protection_period = '0' } = originDrill || {};
    const [mining = '0', efficiency = '0'] = productivity;

    const { productivity: targetProductivity = [], protection_period: targetProtectionPeriod = '0' } = targetDrill || {};
    const [targetMining = '0', targetEfficiency = '0'] = targetProductivity;

    const { prefer = 'resource' } = originDrillInfo || {};

    const res: PreviewItem[] = [
      {
        label: t('drill:Mining Efficiency'),
        preValue: `+${mining}%`,
        curValue: `${targetMining}%`
      },
      {
        label: `${prefer.toUpperCase()}・${t('drill:Element Efficiency')}`,
        preValue: `+${efficiency}%`,
        curValue: `${targetEfficiency}%`
      },
      {
        label: t('drill:Initial Protection'),
        preValue: `${protection_period} ${t('drill:Initial_Protection_day(s)')}`,
        curValue: `${targetProtectionPeriod} ${t('drill:Initial_Protection_day(s)')}`
      }
    ];

    setPreviewData(res);
  }, [originDrill, targetDrill, originDrillInfo, t]);

  useEffect(() => {
    convertToSlots();
    convertToPreviewData();
  }, [convertToSlots, convertToPreviewData]);

  const handleDismantle = () => {
    handleFurnaceDisenchantProps(originTokenId, '1');
  };

  return (
    <Container>
      <Stove bg='dismantle' slots={slots} onLaunch={disPlayerFilterDrillModal} launcherImg={originDrill && getDrillImage(originDrill?.class, originDrill?.grade, 'png')} />
      <PreviewPanel title={`${t('Dismantle')}: ${originDrill?.name ?? ''}`} successRate={100} previewData={previewData}>
        <Erc721ApproveButton landId={landId} from={account} provider={library} tokenContractAddress={objectOwnerShipContractAddress} spenderAddress={furnaceItemBaseContractAddress} tokenId={originTokenId} buttonText={t('Approve Drill')}>
          <Button scale='sm' isLoading={isDismantling} onClick={handleDismantle}>
            {t('furnace:Dismantle')}
          </Button>
        </Erc721ApproveButton>
      </PreviewPanel>
    </Container>
  );
}

export default DrillDismantle;
