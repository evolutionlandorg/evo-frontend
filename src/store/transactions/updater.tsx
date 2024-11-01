// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal, Text, Flex, Link } from 'components';
import { useTranslation } from 'react-i18next';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { getExplorerLink } from 'utils';
import useToast from 'hooks/useToast';
import { useCurrentLand } from 'hooks/useRouterParams';
import { EventsLogHandlerConfig } from 'config/eventsLog';

import { bundleApi } from 'api';
import { useBlock } from '../block/hooks';
import { AppDispatch, AppState } from '../index';
import { checkedTransaction, finalizeTransaction } from './actions';

export function shouldCheck(currentBlock: number, tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number }): boolean {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  }
  if (minutesPending > 5) {
    // every 5 blocks if pending more than 5 minutes
    return blocksSinceCheck > 5;
  }
  // otherwise every block
  return true;
}

export default function Updater(): null {
  const landId = useCurrentLand();
  const { library, chainId } = useActiveWeb3React(landId);
  const { t } = useTranslation();
  const [modal, setModal] = useState<React.ReactNode>(null);
  const [openModal] = useModal(modal);
  const { currentBlock } = useBlock();

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions);

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state]);

  const { toastError, toastSuccess } = useToast();

  useEffect(() => {
    if (modal) {
      openModal();
      setModal(null);
    }
  }, [modal, openModal]);

  useEffect(() => {
    if (!chainId || !library || !currentBlock) return;

    Object.keys(transactions)
      .filter((hash) => shouldCheck(currentBlock, transactions[hash]))
      .forEach((hash) => {
        bundleApi[landId]
          .getTransactionInfo(library, hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex
                  }
                })
              );

              const toast = receipt.status === 1 ? toastSuccess : toastError;
              const transaction = transactions[hash];

              const eventsLogHandler = EventsLogHandlerConfig[landId][receipt.to.toLowerCase()];
              const { toastContent = null, modalContent = null } = eventsLogHandler ? eventsLogHandler(landId, t, receipt, transaction) : {};

              if (modalContent) {
                setModal(modalContent);
              }

              toast(
                'Transaction receipt',
                <Flex flexDirection='column'>
                  <Text>{toastContent ?? transaction?.summary ?? `Hash: ${hash.slice(0, 8)}...${hash.slice(58, 65)}`}</Text>
                  {chainId && (
                    <Link external href={getExplorerLink(landId, hash, 'transaction')}>
                      {t('View on Explorer')}
                    </Link>
                  )}
                </Flex>
              );
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }));
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [chainId, library, transactions, currentBlock, dispatch, toastSuccess, toastError, t, landId, openModal]);

  return null;
}
