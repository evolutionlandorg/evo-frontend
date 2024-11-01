// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { ConfigProvider } from "antd";
import Bignumber from 'bignumber.js';
import { MaxUint256 } from '@ethersproject/constants';
import { bundleApi } from 'api';
import useToast from 'hooks/useToast';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTranslation } from 'react-i18next';
import useRefresh from 'hooks/useRefresh';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { BareProps } from '../types';
import ConnectWalletButton from '../ConnectWalletButton';
import { Button } from '../Button';
import { ToastDescriptionWithTx } from '../Toast';
import { ButtonProps, Scale } from '../Button/types';

interface Props extends BareProps, ButtonProps {
  provider: Web3Provider;
  isDisabled?: boolean;
  tokenContractAddress: string;
  spenderAddress: string;
  amountToUse: string;
  approvedValue?: EthersBigNumber;
  from?: string;
  children?: React.ReactNode;
  scale?: Scale;
  buttonText?: string;
  landId: SUPPORTED_LANDS_INDEX;
  skip?: boolean;
}

export type Erc20ApproveButtonProps = Props;

export const Erc20ApproveButton: React.FC<Props> = ({ className, landId, provider, isDisabled, tokenContractAddress, spenderAddress, amountToUse, approvedValue = MaxUint256, from = null, buttonText, children, skip, ...props }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isEnoughApprove, setEnoughApprove] = useState(false);
  const [isInit, setInit] = useState(false);
  const [approveCount, setApprove] = useState(1);
  const { toastSuccess, toastError } = useToast();
  const { fastRefresh } = useRefresh();
  const { account } = useActiveWeb3React(landId);

  const buttonIsDisabled = useMemo(() => !tokenContractAddress || !spenderAddress || !amountToUse || !approvedValue || isDisabled, [amountToUse, approvedValue, isDisabled, spenderAddress, tokenContractAddress]);

  const approveFunc = useCallback(() => {
    const func = async () => {
      setLoading(true);
      try {
        await bundleApi[landId].erc20.erc20ApproveByContractAddress(provider.getSigner(), tokenContractAddress, spenderAddress, approvedValue.toString(), {
          successCallback: ({ transactionHash }) => {
            setApprove(approveCount + 1);
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
            console.error('🚀 ~ file: Erc20ApproveButton.tsx ~ line 38 ~ awaiterc20Approve ~ error', error);
          }
        });
      } catch (error) {
        console.info('erc20ApproveButton error: ', error);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
        setLoading(false);
      }
    };

    if (provider && tokenContractAddress && spenderAddress && approvedValue && approveCount) {
      func();
    }
  }, [provider, tokenContractAddress, spenderAddress, approvedValue, approveCount, landId, toastSuccess, toastError]);

  useEffect(() => {
    const checkAllowance = async () => {
      try {
        console.info('checkAllowance params:', {
          approveCount,
          amountToUse,
          tokenContractAddress,
          spenderAddress,
          from,
          provider
        });

        if (!provider || !tokenContractAddress || !from || !spenderAddress) {
          return;
        }

        const allowance = await bundleApi[landId].erc20.erc20AllowanceByContractAddress(provider, tokenContractAddress, from, spenderAddress);

        console.info('erc20 approve button:', { allowance, amountToUse });

        setEnoughApprove(new Bignumber(allowance).gte(new Bignumber(amountToUse)));
        setInit(true);
      } catch (error) {
        console.info('erc20 approve button error:', error);
        setEnoughApprove(false);
      }
    };
    if (!skip) {
      checkAllowance();
    }
  }, [approveCount, amountToUse, tokenContractAddress, spenderAddress, from, provider, landId, fastRefresh, skip]);

  if (!account) {
    return <ConnectWalletButton className={className} scale='sm' landId={landId} {...props} />;
  }

  return (
    <>
      {(isInit && isEnoughApprove) || skip ? (
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
          {buttonText || t('Approve Token')}
        </Button>
        // </ConfigProvider>
      )}
    </>
  );
};
