// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import { PopupWindow, PopupHeader } from 'components/PopupWindow';
import { useWeb3React } from '@web3-react/core';
import { MaxUint256 } from '@ethersproject/constants';

import { bundleApi } from 'api';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { Modal, Button, useModal, ModalProps, Erc20ApproveButton } from 'components';
import { useParams } from 'react-router-dom';
import { env, getRpcInfoByLandId } from 'config';
import { RouterParams } from 'pages/ContinentLayout/types';
import Bignumber from 'bignumber.js';
import { useLandBidWithToken } from 'hooks/useLand';
import { useCurrentLand } from 'hooks/useRouterParams';
import { extendLandId } from 'utils';

interface StateProps {
  name?: string;
  className?: string;
}

const CustomModal: React.FC<ModalProps> = ({ title, onDismiss, ...props }) => (
  <Modal title={title} onDismiss={onDismiss} {...props}>
    <Button>This button Does nothing</Button>
  </Modal>
);

const Index: React.FC<StateProps> = ({ name, className }) => {
  const landId = useCurrentLand();
  const rpcInfo = getRpcInfoByLandId(landId);
  const { library, account, chainId } = useActiveWeb3React(landId);
  const [isERC20AllowanceRING, setIsERC20AllowanceRING] = useState('0');
  const [onPresent1] = useModal(<CustomModal title='Modal 1' />);
  const [pendingTx, setPendingTx] = useState(false);
  const { handleLandBidWithToken, pendingTx: requestedLandBidWithToken } = useLandBidWithToken(landId, '2a0400010400010100000000000000040000000000000000000000000000055f', '', '100000000000000000000000');
  const landClockAuctionV3Address = bundleApi[landId].getAddressByName(chainId, 'LAND_CLOCK_AUCTION');
  const apostleBaseAddress = bundleApi[landId].getAddressByName(chainId, 'APOSTLE_BASE');
  const RINGAddress = bundleApi[landId].getAddressByName(chainId, 'TOKEN_RING');

  console.info('ConnectWalletButton Network', rpcInfo, library, account);

  useEffect(() => {
    const fetchData = async () => {
      const data = await bundleApi[landId].erc20.erc20Allowance(extendLandId(landId), library, 'ring', account, landClockAuctionV3Address);
      setIsERC20AllowanceRING(data);
    };
    if (account) {
      fetchData();
    }
  }, [account, landClockAuctionV3Address, landId, library]);

  const onApprove = async () => {
    setPendingTx(true);
    bundleApi[landId].erc20.erc20Approve(extendLandId(landId), library.getSigner(), 'ring', landClockAuctionV3Address, `0x0`, {
      successCallback: ({ transactionHash }) => {
        console.info(transactionHash);
        setPendingTx(false);
      },
      errorCallback: (e) => {
        setPendingTx(false);
      }
    });
  };

  const onApproveApostleBase = async () => {
    setPendingTx(true);
    bundleApi[landId].erc20.erc20Approve(extendLandId(landId), library.getSigner(), 'ring', apostleBaseAddress, `0x0`, {
      successCallback: ({ transactionHash }) => {
        console.info(transactionHash);
        setPendingTx(false);
      },
      errorCallback: (e) => {
        setPendingTx(false);
      }
    });
  };

  const onBuyLand = () => {
    console.info('onBuyLand');

    bundleApi[landId].land.landBidWithToken(extendLandId(landId), library.getSigner(), '0x2a04000104000101000000000000000400000000000000000000000000000270', '', `100000000000000000000000`);
  };

  return (
    <PopupWindow className={className}>
      Evolution.js
      <div>
        <ConnectWalletButton landId={landId} />
        <p>connected: {account}</p>
        <Button onClick={onPresent1}>Open modal 1</Button>
        <Button isLoading={pendingTx} onClick={onApprove}>
          Approve RING - landClockAuctionV3
        </Button>
        <Button isLoading={pendingTx} onClick={onApproveApostleBase}>
          Approve RING - apostleBase
        </Button>
      </div>
      <p>erc20AllowanceRING: {isERC20AllowanceRING}</p>
      <h1>1. buy land</h1>
      <Erc20ApproveButton from={account} landId={landId} provider={library} tokenContractAddress={RINGAddress} spenderAddress={landClockAuctionV3Address} amountToUse='100000000000000000000'>
        <Button isLoading={requestedLandBidWithToken} onClick={handleLandBidWithToken}>
          Buy Land
        </Button>
      </Erc20ApproveButton>
    </PopupWindow>
  );
};

export default React.memo(Index);
