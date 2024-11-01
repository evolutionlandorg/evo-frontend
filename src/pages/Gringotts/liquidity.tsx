// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useBankUniswapAddETHLiquidity, useBankUniswapAddLiquidity, useBankUniswapGetDerivedMintInfo } from 'hooks/useBank';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import { Button, Box } from 'components';
import { Form, Input, Radio } from 'antd';
import { parseUnits } from '@ethersproject/units';
import useToast from 'hooks/useToast';
import BigNumber from 'bignumber.js';
import { getAddressByName } from '@evolutionland/evolution-js/lib/utils/ethers/addressHelper';
import { getFullDisplayBalance } from 'utils/formatBalance';
import get from 'lodash/get';
import { CompactToken } from '@evolutionland/evolution-js/lib/api/ethers';
import { ETHERS_BIG_ZERO } from 'utils/bigNumber';
import { isSameAddress } from 'utils/address';
import { ethers } from 'ethers';
import { PairsSelect } from './component';

interface Props {
  name?: string;
  className?: string;
}

const Liquidity: React.FC<Props> = ({ className }) => {
  const landId = useCurrentLand();
  const { library, chainId, account } = useActiveWeb3React(landId);

  const [token1, setToken1] = useState<CompactToken>(null);
  const [token2, setToken2] = useState<CompactToken>(null);

  const [token1InputAmount, setToken1InputAmount] = useState<string>('');
  const [token2InputAmount, setToken2InputAmount] = useState<string>('');

  const [focusToken, setFocusToken] = useState('token1');

  const { handleUniswapGetDerivedMintInfo, info } = useBankUniswapGetDerivedMintInfo(landId);

  const { handleUniswapAddETHLiquidity, pendingTx: handleUniswapAddETHLiquidityPendingTx } = useBankUniswapAddETHLiquidity(landId);
  const { handleUniswapAddLiquidity, pendingTx: handleUniswapAddLiquidityPendingTx } = useBankUniswapAddLiquidity(landId);
  const { toastSuccess, toastError } = useToast();

  const liquidityMinted = useMemo(() => {
    if (info) {
      const liquidityAmountToken = get(info.parsedAmounts, info.pair.liquidityToken.address);
      const token0AmountToken = get(info.parsedAmounts, info.pair.tokenAmounts[0].token.address);
      const token1AmountToken = get(info.parsedAmounts, info.pair.tokenAmounts[1].token.address);
      const minted = info?.pair.getLiquidityMinted(liquidityAmountToken, token0AmountToken, token1AmountToken);

      return minted;
    }

    return null;
  }, [info]);

  const handleToken1OnChange = (e) => {
    const { value } = e.target;
    setFocusToken('token1');
    setToken1InputAmount(value);

    if (token1.address && token2.address && value) {
      try {
        handleUniswapGetDerivedMintInfo(
          {
            address: token1.address,
            decimals: token1.decimals,
            amount: parseUnits(value)
          },
          {
            address: token2.address,
            decimals: token2.decimals,
            amount: ETHERS_BIG_ZERO
          }
        );
      } catch (error) {
        console.error('handleUniswapGetDerivedMintInfo', error);
      }
    }
  };

  const handleToken2OnChange = (e) => {
    const { value } = e.target;
    setFocusToken('token2');
    setToken2InputAmount(value);

    if (token1.address && token2.address && value) {
      try {
        handleUniswapGetDerivedMintInfo(
          {
            address: token1.address,
            decimals: token1.decimals,
            amount: ETHERS_BIG_ZERO
          },
          {
            address: token2.address,
            decimals: token2.decimals,
            amount: parseUnits(value)
          }
        );
      } catch (error) {
        console.error('handleUniswapGetDerivedMintInfo', error);
      }
    }
  };

  const handleAddLiquidity = useCallback(() => {
    if (!(token1InputAmount || token2InputAmount)) {
      toastError('The input content cannot be empty');
      return;
    }

    if (isSameAddress(token1.address, getAddressByName(chainId, 'TOKEN_WETH')) || isSameAddress(token2.address, getAddressByName(chainId, 'TOKEN_WETH'))) {
      // eth-erc20
      handleUniswapAddETHLiquidity(
        {
          ...token1,
          amount: focusToken === 'token1' ? ethers.BigNumber.from(get(info, ['parsedAmounts', token1?.address])?.raw.toString()) : ETHERS_BIG_ZERO
        },
        {
          ...token2,
          amount: focusToken === 'token2' ? ethers.BigNumber.from(get(info, ['parsedAmounts', token2?.address])?.raw.toString()) : ETHERS_BIG_ZERO
        }
      );
    } else {
      // erc20-erc20
      handleUniswapAddLiquidity(
        {
          ...token1,
          amount: focusToken === 'token1' ? ethers.BigNumber.from(get(info, ['parsedAmounts', token1?.address])?.raw.toString()) : ETHERS_BIG_ZERO
        },
        {
          ...token2,
          amount: focusToken === 'token2' ? ethers.BigNumber.from(get(info, ['parsedAmounts', token2?.address])?.raw.toString()) : ETHERS_BIG_ZERO
        }
      );
    }
  }, [chainId, focusToken, handleUniswapAddETHLiquidity, handleUniswapAddLiquidity, info, toastError, token1, token1InputAmount, token2, token2InputAmount]);

  const handlePairsSelect = (data) => {
    setToken1(data[0]);
    setToken2(data[1]);
  };

  return (
    <Box>
      <Form layout='vertical'>
        <Form.Item label='Pair' required tooltip='This is a required field'>
          <PairsSelect landId={landId} onChange={handlePairsSelect} />
        </Form.Item>
        <Form.Item label={`Token 1 - ${token1?.symbol || ''}`} required tooltip='This is a required field'>
          <Input
            type='number'
            placeholder='input placeholder'
            suffix={token1?.symbol}
            disabled={!token1?.address}
            onChange={(e) => {
              handleToken1OnChange(e);
            }}
            value={focusToken === 'token2' ? getFullDisplayBalance(new BigNumber(get(info, ['parsedAmounts', token1?.address])?.raw.toString()), token1?.decimals) : token1InputAmount}
          />
        </Form.Item>
        <Form.Item label={`Token 2 - ${token2?.symbol || ''}`} required tooltip='This is a required field'>
          <Input type='number' placeholder='input placeholder' suffix={token2?.symbol} disabled={!token2?.address} onChange={handleToken2OnChange} value={focusToken === 'token1' ? getFullDisplayBalance(new BigNumber(get(info, ['parsedAmounts', token2?.address])?.raw.toString()), token2?.decimals) : token2InputAmount} />
        </Form.Item>
        <Form.Item label='LP amount' required tooltip='This is a required field'>
          <span className='ant-form-text'>
            {getFullDisplayBalance(new BigNumber(liquidityMinted?.raw.toString() || '0'), liquidityMinted?.token.decimals)} {token1?.symbol || ''}-{token2?.symbol || ''} LP
          </span>
        </Form.Item>
      </Form>
      <Button
        isLoading={handleUniswapAddETHLiquidityPendingTx || handleUniswapAddLiquidityPendingTx}
        onClick={() => {
          handleAddLiquidity();
        }}
      >
        Add Liquidity
      </Button>
    </Box>
  );
};

export default Liquidity;
