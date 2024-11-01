// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { bundleApi } from 'api';
import React from 'react';
import { extendLandId } from 'utils';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { LandConfig } from '@evolutionland/evolution-js';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { getDisplayBalanceWithFixd } from 'utils/formatBalance';
import { ethersToBigNumber, ETHERS_BIG_ZERO } from 'utils/bigNumber';
import { TFunction } from 'react-i18next';
import { OperationType, TransactionDetails } from 'store/transactions/reducer';

interface EventHandleResult {
  toastContent: string | JSX.Element;
  modalContent?: JSX.Element;
}

type EventHandler = (landId: SUPPORTED_LANDS_INDEX, t: TFunction, receipt: TransactionReceipt, transaction: TransactionDetails) => EventHandleResult;

// https://docs.ethers.io/v5/api/utils/abi/interface/
const LotteryEventHandler: EventHandler = (landId, t, receipt) => {
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const abi = ['event RewardClaimedWithPoints(address indexed user, uint256 pointAmount, uint256 rewardAmount)'];
  const iface = new ethers.utils.Interface(abi);
  const topic0 = iface.getEventTopic('RewardClaimedWithPoints');

  const logs = receipt.logs.filter((log) => log.topics[0] === topic0);

  if (!logs || logs.length === 0) {
    return null;
  }

  const decodeLog = iface.decodeEventLog('RewardClaimedWithPoints', logs[0].data, logs[0].topics);

  if (decodeLog.rewardAmount.eq(ETHERS_BIG_ZERO)) {
    return { toastContent: t('Unfortunately... you win nothing') };
  }

  return {
    toastContent: t('Congratulations on winning token', {
      amount: getDisplayBalanceWithFixd(ethersToBigNumber(decodeLog.rewardAmount), RING.decimals, 0),
      symbol: RING.symbol
    })
  };
};

const FurnaceDrillEventHandler: EventHandler = (landId, t, { logs: rawLogs }, { operation }) => {
  const ABI = ['event Enchanced(address user, uint256 tokenId, uint256 index, uint128 rate, uint16 objClassExt, uint16 class, uint16 grade, uint16 prefer, address major, uint256 id, address minor, uint256 amount, uint256 now)', 'event Disenchanted(address user, uint256 tokenId, address major, uint256 id, address minor, uint256 amount)'];
  const iface = new ethers.utils.Interface(ABI);

  const operationInfos = {
    [OperationType.FurnaceUpgradeDrill]: {
      eventName: 'Enchanced',
      successToastContent: t('furnace:Upgraded!'),
      failToastContent: t('furnace:Failed Upgrading')
    },
    [OperationType.FurnaceDismantleDrill]: {
      eventName: 'Disenchanted',
      successToastContent: t('furnace:Dismantled!'),
      failToastContent: t('furnace:Failed Dismantling')
    }
  };

  const operationInfo = operationInfos[operation];

  if (!operationInfo) {
    return null;
  }

  const { eventName, successToastContent, failToastContent } = operationInfo;
  const topic = iface.getEventTopic(eventName);

  const logs = rawLogs.filter(({ topics }) => topics[0] === topic);

  if (!logs?.length) {
    return {
      toastContent: failToastContent
    };
  }

  return {
    toastContent: successToastContent
  };
};

export const EventsLogHandlerConfig = {
  '1': {},
  '2': {},
  '3': {
    [(bundleApi['3'].getAddressByName(extendLandId('3'), 'POINTS_REWARD_POOL') || 'POINTS_REWARD_POOL').toLowerCase()]: LotteryEventHandler,

    [bundleApi[3].getAddressByName(extendLandId('3'), 'FURNACE_ITEM_BASE').toLowerCase()]: FurnaceDrillEventHandler
  },
  '4': {
    [bundleApi[4].getAddressByName(extendLandId('4'), 'FURNACE_ITEM_BASE').toLowerCase()]: FurnaceDrillEventHandler
  },
  '5': {
    [bundleApi[5].getAddressByName(extendLandId('5'), 'FURNACE_ITEM_BASE').toLowerCase()]: FurnaceDrillEventHandler
  }
};
