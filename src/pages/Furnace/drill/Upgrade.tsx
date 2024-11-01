// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Token } from 'types';
import { useTranslation } from 'react-i18next';
import { Button, Erc20ApproveButton, Erc721ApproveButton, useModal } from 'components';
import { useCurrentLand } from 'hooks/useRouterParams';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { FilterDrillModal, FilterIllustratedModal } from 'pages/Drill/component';
import { Illustrated, useGetDrill, useGetIllustratedList } from 'hooks/backendApi';
import { getDrillImage, getIllustratedById } from 'pages/Drill/utils';
import { getDisplayBalanceWithFixd } from 'utils/formatBalance';
import { parseUnits } from 'ethers/lib/utils';
import { ethersToBigNumber, ETHERS_BIG_ZERO } from 'utils/bigNumber';
import { useTokenBalance } from 'hooks/useBalance';
import { LandConfig } from '@evolutionland/evolution-js';
import { useBankUniswapGetDerivedPairInfo } from 'hooks/useBank';
import { extendLandId } from 'utils';
import { getTokenResourceList } from 'utils/tokenList';
import { bundleApi } from 'api';
import { useFurnaceEnchantProps } from 'hooks/useFurnace';
import { Stove, StoveSlotProps } from '../component/Stove';
import { PreviewItem, PreviewPanel } from '../component/PreviewPanel';
import { Container } from '../component/Container';

function DrillUpgrade() {
  const landId = useCurrentLand();
  const { library, chainId, account } = useActiveWeb3React(landId);
  const { t } = useTranslation();

  const { handleFurnaceEnchantProps, pendingTx: isUpgrading } = useFurnaceEnchantProps(landId);

  const { data: getBlueprintListResponse } = useGetIllustratedList({ landId });
  const blueprintList = getBlueprintListResponse?.data;

  const furnaceItemBaseContractAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), 'FURNACE_ITEM_BASE'), [landId]);
  const objectOwnerShipContractAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP'), [landId]);

  const [launcher, setLauncher] = useState<Illustrated>(null);
  const hasElement = useMemo(() => launcher && launcher.minor.element !== '0', [launcher]);

  const [originTokenId, setOriginTokenId] = useState('');
  const originInfo = useMemo(() => {
    if (!launcher || !blueprintList) {
      return null;
    }

    const info = getIllustratedById(blueprintList, launcher.major_id);
    const { grade: rarity, class: level } = info;

    const { name } = blueprintList.find(({ grade, class: blueprintLevel }) => grade === info.grade && blueprintLevel === 0);

    return {
      ...info,
      level,
      rarity,
      name: `${t(name)} ${level ? `+${level}` : ''}`
    };
  }, [launcher, blueprintList, t]);

  const [previewData, setPreviewData] = useState<PreviewItem[]>([]);

  const { data: drillInfo } = useGetDrill({ landId, tokenId: originTokenId });

  const [token, setToken] = useState<Token>(null);
  const tokenBalance = useTokenBalance(landId, token?.address, account);

  const pairResource = useMemo(() => getTokenResourceList(landId).find((item) => item.symbol.toLocaleLowerCase() === drillInfo?.prefer), [drillInfo?.prefer, landId]);
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const pairToken = useBankUniswapGetDerivedPairInfo(landId, pairResource, RING);
  const pairTokenSymbol = useMemo(() => {
    if (!pairToken) {
      return '';
    }
    const { token0, token1 } = pairToken;
    return `${token0.symbol}-${token1.symbol} LP`;
  }, [pairToken]);
  const pairTokenBalance = useTokenBalance(landId, pairToken?.liquidityToken.address, account);

  const approveProps = useMemo(() => {
    if (!launcher || (!token && !pairToken)) {
      return {
        address: '',
        price: ETHERS_BIG_ZERO.toString(),
        buttonText: t('Approve Token')
      };
    }

    const { minor } = launcher;

    if (hasElement) {
      return {
        address: token?.address,
        price: parseUnits(minor.element).toString(),
        buttonText: `${t('Approve')} ${token?.symbol}`
      };
    }

    return {
      address: pairToken?.liquidityToken.address,
      price: parseUnits(minor.LP).toString(),
      buttonText: `${t('Approve')} ${pairToken?.token0.symbol}-${pairToken?.token1.symbol} LP`
    };
  }, [launcher, token, pairToken, hasElement, t]);

  const [displayFilterIllustratedModal] = useModal(
    <FilterIllustratedModal
      title='Illustrated List'
      landId={landId}
      drillSelected={(id, illustrated) => {
        setOriginTokenId('');
        setLauncher(illustrated);
      }}
    />,
    true,
    true,
    'FilterIllustratedModal'
  );
  const [displayFilterDrillModal] = useModal(
    <FilterDrillModal
      title='Drill List'
      landId={landId}
      formulaId={launcher?.major_id}
      initFilter='fresh'
      drillSelected={(tokenId, formulaId, onDismiss) => {
        setOriginTokenId(tokenId);
        onDismiss();
      }}
    />,
    true,
    true,
    'UpgradeDrill'
  );

  const slots = useMemo<StoveSlotProps[]>(() => {
    const res: StoveSlotProps[] = [];
    if (!launcher) {
      return res;
    }

    let drillSlot: StoveSlotProps = {
      tips: [t('Drill'), '0 / 1'],
      isError: !originTokenId,
      disabled: false,
      onClick: displayFilterDrillModal,
      selectable: true
    };
    if (originTokenId && originInfo) {
      const { name, level, rarity } = originInfo;

      drillSlot = {
        ...drillSlot,
        tips: [name, '1 / 1'],
        src: getDrillImage(level, rarity, 'png')
      };
    }
    res.push(drillSlot);

    const { minor } = launcher;
    const { element = '0', LP = '0' } = minor;
    const requireElement = ethersToBigNumber(parseUnits(element));
    const requireLP = ethersToBigNumber(parseUnits(LP));

    if (hasElement) {
      const elementSlot: StoveSlotProps = {
        tips: [token?.symbol || t('furnace:Resource Token'), `${getDisplayBalanceWithFixd(tokenBalance, 18, 0)} / ${element}`],
        isError: tokenBalance.lt(requireElement),
        src: token && `/images/token/${token.symbol.toLowerCase()}.svg`
      };

      res.push(elementSlot);
    }

    if (LP !== '0') {
      let LPSlot: StoveSlotProps = {
        tips: ['LP Token', `0 / ${LP}`],
        isError: true
      };

      if (pairToken) {
        LPSlot = {
          tips: [pairTokenSymbol, `${getDisplayBalanceWithFixd(pairTokenBalance, pairToken.liquidityToken.decimals, 2)} / ${LP}`],
          isError: pairTokenBalance.lt(requireLP),
          src: `/images/token/${pairResource.symbol.toLowerCase()}.svg`
        };
      }

      res.push(LPSlot);
    }

    return res;
  }, [launcher, displayFilterDrillModal, originTokenId, originInfo, hasElement, tokenBalance, token, pairToken, pairTokenBalance, pairTokenSymbol, pairResource, t]);

  const convertToPreviewData = useCallback(() => {
    const { productivity = [], protection_period = '0' } = originInfo || {};
    const [mining = '0', efficiency = '0'] = productivity;

    const { productivity: targetProductivity = [], protection_period: targetProtectionPeriod = '0' } = launcher || {};

    const { symbol } = token || {};
    const [targetMining = '0', targetEfficiency = '0'] = targetProductivity;

    const res: PreviewItem[] = [
      {
        label: t('drill:Mining Efficiency'),
        preValue: `+${mining}%`,
        curValue: `${targetMining}%`
      },
      {
        label: `${symbol ? `${symbol.toUpperCase()} ・ ` : ''}${t('drill:Element Efficiency')}`,
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
  }, [launcher, originInfo, token, t]);

  useEffect(() => {
    convertToPreviewData();
  }, [convertToPreviewData]);

  const handleUpgrade = () => {
    handleFurnaceEnchantProps(launcher.index, originTokenId, hasElement ? token.address : pairToken.liquidityToken.address);
  };

  return (
    <Container>
      <Stove bg='upgrade' onLaunch={displayFilterIllustratedModal} slots={slots} launcherImg={launcher && getDrillImage(launcher?.class, launcher?.grade, 'png')} />
      <PreviewPanel title={`${t('Upgrade')}: ${t(originTokenId ? originInfo?.name : '')}`} successRate={100} previewData={previewData} landId={landId} chainId={chainId} resource={pairResource?.symbol} onResourceSelect={setToken} enableResourcesSelect={hasElement}>
        <Erc721ApproveButton landId={landId} from={account} provider={library} tokenContractAddress={objectOwnerShipContractAddress} spenderAddress={furnaceItemBaseContractAddress} tokenId={originTokenId} buttonText={t('Approve Drill')}>
          <Erc20ApproveButton from={account} landId={landId} provider={library} tokenContractAddress={approveProps.address} spenderAddress={furnaceItemBaseContractAddress} amountToUse={approveProps.price} buttonText={approveProps.buttonText}>
            <Button scale='sm' onClick={handleUpgrade} isLoading={isUpgrading}>
              {t('Upgrade')}
            </Button>
          </Erc20ApproveButton>
        </Erc721ApproveButton>
      </PreviewPanel>
    </Container>
  );
}

export default DrillUpgrade;
