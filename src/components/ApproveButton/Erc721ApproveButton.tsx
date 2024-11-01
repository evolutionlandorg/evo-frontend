// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { bundleApi } from 'api';
import useToast from 'hooks/useToast';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { BareProps } from 'components/types';
import { Web3Provider } from '@ethersproject/providers';
import { useTransactionAdder } from 'store/transactions/hooks';
import { responseCallback } from 'utils';
import useRefresh from 'hooks/useRefresh';
import { Button } from '../Button';
import { ToastDescriptionWithTx } from '../Toast';
import { Scale } from '../Button/types';

interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  provider: Web3Provider;
  isDisabled?: boolean;
  tokenContractAddress: string;
  spenderAddress: string;
  tokenId: string;
  from?: string;
  children?: React.ReactNode;
  scale?: Scale;
  buttonText?: string;
}

export const Erc721ApproveButton: React.FC<Props> = ({ className, landId, provider, isDisabled = false, tokenContractAddress, spenderAddress, tokenId, from = null, children, buttonText = 'Approve', ...props }) => {
  const [loading, setLoading] = useState(false);
  const [isApprove, setApprove] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInit, setInit] = useState(false);
  const { fastRefresh } = useRefresh();
  const [freshCount, setFreshCount] = useState(0);
  const { toastSuccess, toastError } = useToast();
  const buttonIsDisabled = useMemo(() => !tokenContractAddress || !spenderAddress || !tokenId || isDisabled || isError, [isDisabled, isError, spenderAddress, tokenContractAddress, tokenId]);
  const addTransaction = useTransactionAdder(landId);

  const approveFunc = useCallback(() => {
    const func = async () => {
      setLoading(true);
      try {
        const tx = await bundleApi[landId].erc721.erc721SetApprovalForAll(provider.getSigner(), tokenContractAddress, spenderAddress, true, {
          successCallback: ({ transactionHash }) => {
            setFreshCount(freshCount + 1);
            setLoading(false);
            toastSuccess(
              'Contract Enabled',
              <ToastDescriptionWithTx landId={landId} txHash={transactionHash}>
                You have approved token the contract
              </ToastDescriptionWithTx>
            );
          },
          errorCallback: ({ error }) => {
            setLoading(false);
            toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
            console.error('🚀 ~ file: Erc721ApproveButton.tsx ~ line 38 ~ awaiterc20Approve ~ error', error);
          }
        });
        addTransaction(tx, {
          summary: `Approve: Approve NFT`
        });
        responseCallback(tx, () => setLoading(false));
      } catch (error) {
        console.info('erc721ApproveButton error: ', error);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
        setLoading(false);
      }
    };
    func();
  }, [addTransaction, freshCount, landId, provider, spenderAddress, toastError, toastSuccess, tokenContractAddress]);

  useEffect(() => {
    const checkAllowance = async () => {
      try {
        console.info('erc721ApproveButton checkAllowance params:', {
          freshCount,
          tokenId,
          tokenContractAddress,
          spenderAddress,
          from,
          provider
        });

        if (!provider || !tokenContractAddress || !from || !spenderAddress) {
          return;
        }

        const result = await bundleApi[landId].erc721.erc721IsApprovedOrOwner(provider, spenderAddress, tokenContractAddress, tokenId);

        console.info('erc721 approve button:', { tokenContractAddress, spenderAddress, tokenId, result });

        setApprove(result);
        setInit(true);
        setIsError(false);
      } catch (error) {
        console.info('erc721 approve button error:', error);
        setApprove(false);
        setIsError(true);
        setInit(true);
      }
    };

    if (provider && spenderAddress && tokenContractAddress && tokenId) {
      checkAllowance();
    } else {
      setApprove(false);
      setIsError(true);
      setInit(true);
    }
  }, [tokenContractAddress, spenderAddress, from, provider, tokenId, freshCount, landId, fastRefresh]);

  return (
    <>
      {isInit && isApprove ? (
        children
      ) : (
        // <ConfigProvider autoInsertSpaceInButton={false}>
        <Button
          scale='sm'
          className={className}
          onClick={() => {
            approveFunc();
          }}
          disabled={buttonIsDisabled}
          isLoading={loading}
          {...props}
        >
          {buttonText}
        </Button>
        // </ConfigProvider>
      )}
    </>
  );
};
