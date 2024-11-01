// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Modal, Button, useModal2, ModalProps, Flex, Erc20ApproveButton, ApostleBox, ApostleBoxEmpty, Box } from 'components';
import styled from 'styled-components';
import { useApostleBreedBid, useApostleAutoBreedFee } from 'hooks/useApostle';
import { useTokenBalance } from 'hooks/useBalance';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { extendLandId } from 'utils';
import { bundleApi } from 'api';
import { Location } from 'history';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { LandConfig } from '@evolutionland/evolution-js';
import { ethersToBigNumber } from 'utils/bigNumber';
import { useGetApostle } from 'hooks/backendApi';
import { StyledFontActive } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { getIsSupportByModuleName } from 'config';
import { FilterApostleModal } from '../FilterApostleModal';
import { StyledApostlesBox, StyledTips } from './styled';

interface Props extends ModalProps {
  initTokenId?: string;
  landId: SUPPORTED_LANDS_INDEX;
  initTargetTokenId?: string;
  bidPrice: EthersBigNumber;
  location: Location;
}

const BreedBidApostleModal: React.FC<Props> = ({ title, onDismiss, initTokenId, initTargetTokenId = '', landId, bidPrice, location, ...props }) => {
  const { t } = useTranslation();
  const [isReadyBreed, setIsReadyBreed] = useState(true);
  const [tokenId, setTokenId] = useState(initTokenId);
  const [targetTokenId, setTargetTokenId] = useState(initTargetTokenId);
  const { library, account } = useActiveWeb3React(landId);
  const autoBreedFee = useApostleAutoBreedFee(landId);
  const { data: apostle } = useGetApostle({ landId, tokenId });
  const { data: targetApsotle } = useGetApostle({ landId, tokenId: targetTokenId });

  const totalFee = EthersBigNumber.from(autoBreedFee.toString()).add(bidPrice);
  const { handleApostleBreedBid, pendingTx } = useApostleBreedBid(landId, tokenId, targetTokenId, totalFee, () => {
    onDismiss();
  });
  const ringAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING');
  const ringBalance = useTokenBalance(landId, ringAddress, account);

  const [onClickFilterApostleModal] = useModal2(
    <FilterApostleModal
      title={t('Apostle List')}
      landId={landId}
      initFilter='sire'
      fetchApstoleParams={{
        sireId: targetTokenId
      }}
      apostleSelected={setTokenId}
    />,
    true,
    true,
    'BreedBidApostleModal-FilterApostleModal'
  );

  const confirmBreed = useCallback(() => {
    handleApostleBreedBid();
  }, [handleApostleBreedBid]);

  const apostleSiringAuctionV3 = bundleApi[landId].getAddressByName(extendLandId(landId), 'SIRING_CLOCK_AUCTION');
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  useEffect(() => {
    const hasTokenId = !!(targetTokenId && tokenId);
    const hasBalance = autoBreedFee.lte(ringBalance);
    setIsReadyBreed(hasTokenId && hasBalance);
  }, [autoBreedFee, ringBalance, setIsReadyBreed, targetTokenId, tokenId]);

  return (
    <Modal title={title} bodyPadding='24px 10px' onDismiss={onDismiss} {...props}>
      <StyledApostlesBox>
        <Flex flex='1' justifyContent='space-between'>
          {apostle?.token_index ? <ApostleBox imageOnClick={onClickFilterApostleModal} number={`${apostle?.token_index}`} subtitle={apostle?.apostle_status} imageUrl={apostle?.apostle_picture} /> : <ApostleBoxEmpty hasAdd imageOnClick={onClickFilterApostleModal} />}
          <ApostleBox number={`${targetApsotle?.token_index}`} subtitle={targetApsotle?.apostle_status} imageUrl={targetApsotle?.apostle_picture} />
        </Flex>
        <StyledTips mt='1rem' maxWidth='80%'>
          {t('Already entered the Harvest Era. It’s necessary to add resource token when claim baby apostles.')}
        </StyledTips>
      </StyledApostlesBox>
      <Box my='1rem'>
        {t('Breed Price')}:{' '}
        <StyledFontActive className='mr-2'>
          {getFullDisplayBalance(ethersToBigNumber(bidPrice), RING.decimals)} {RING.symbol}
        </StyledFontActive>
        {t('Breed Fee')}:{' '}
        <StyledFontActive>
          {getFullDisplayBalance(autoBreedFee, RING.decimals)} {RING.symbol}
        </StyledFontActive>
      </Box>
      <Erc20ApproveButton skip={getIsSupportByModuleName(landId, 'RING_TOKENFALLBACK')} scale='sm' from={account} landId={landId} provider={library} tokenContractAddress={RING.address} spenderAddress={apostleSiringAuctionV3} amountToUse={totalFee.toString()}>
        <Button scale='sm' onClick={confirmBreed} isLoading={pendingTx} disabled={!isReadyBreed}>
          {t('Confirm')}
        </Button>
      </Erc20ApproveButton>
    </Modal>
  );
};

export default React.memo<Props>(styled(BreedBidApostleModal)``);
