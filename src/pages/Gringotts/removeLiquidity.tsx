// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useBankUniswapRemoveETHLiquidity, useBankUniswapRemoveLiquidity, useBankUniswapGetDerivedBurnInfo } from 'hooks/useBank';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import { Button, Box } from 'components';
import { Form, Input, Radio } from 'antd';
import { parseUnits } from '@ethersproject/units';
import useToast from 'hooks/useToast';
import BigNumber from 'bignumber.js';
import { getFullDisplayBalance } from 'utils/formatBalance';
import get from 'lodash/get';
import { CompactToken } from '@evolutionland/evolution-js/lib/api/ethers';
import { isSameAddress } from 'utils/address';
import debounce from 'lodash/debounce';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { PairsSelect } from './component';

interface Props {
  name?: string;
  className?: string;
}

const DEBOUNCE_DELAY = 1000;

const RemoveLiquidity: React.FC<Props> = ({ className }) => {
  const landId = useCurrentLand();
  const { library, chainId, account } = useActiveWeb3React(landId);

  const [token0, setToken0] = useState<CompactToken>(null);
  const [token1, setToken1] = useState<CompactToken>(null);

  const [liquidyInputAmount, setLiquidyInputAmount] = useState<string>('');
  const [token2InputAmount, setToken1InputAmount] = useState<string>('');

  const [focusToken, setFocusToken] = useState('token0');

  const { handleUniswapGetDerivedBurnInfo, info } = useBankUniswapGetDerivedBurnInfo(landId);

  const { handleUniswapRemoveETHLiquidity, pendingTx: handleUniswapRemoveETHLiquidityPendingTx } = useBankUniswapRemoveETHLiquidity(landId);
  const { handleUniswapRemoveLiquidity, pendingTx: handleUniswapRemoveLiquidityPendingTx } = useBankUniswapRemoveLiquidity(landId);
  const { toastSuccess, toastError } = useToast();

  const debounceFn = useRef(
    debounce((_token0, _token1, _value, _account) => {
      if (_token0?.address && _token1?.address && _value) {
        handleUniswapGetDerivedBurnInfo(
          {
            address: _token0?.address,
            decimals: _token0?.decimals
          },
          {
            address: _token1?.address,
            decimals: _token1?.decimals
          },
          parseUnits(_value),
          _account
        );
      }
    }, DEBOUNCE_DELAY)
  );

  useEffect(
    () => {
      debounceFn.current(token0, token1, liquidyInputAmount, account);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [liquidyInputAmount, token0?.address, token1?.address, account]
  );

  const handleLiquidityOnChange = (e) => {
    const { value } = e.target;
    setLiquidyInputAmount(value);
  };

  const handleRemoveLiquidity = useCallback(() => {
    if (!liquidyInputAmount) {
      toastError('The input content cannot be empty');
      return;
    }

    if (isSameAddress(token0.address, bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_WETH')) || isSameAddress(token1.address, bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_WETH'))) {
      handleUniswapRemoveETHLiquidity(token0, token1, parseUnits(liquidyInputAmount));
    } else {
      // erc20-erc20
      handleUniswapRemoveLiquidity(token0, token1, parseUnits(liquidyInputAmount));
    }
  }, [liquidyInputAmount, token0, landId, token1, toastError, handleUniswapRemoveETHLiquidity, handleUniswapRemoveLiquidity]);

  const handlePairsSelect = (data) => {
    setToken0(data[0]);
    setToken1(data[1]);
  };

  return (
    <Box>
      <Form layout='vertical'>
        <Form.Item label='Pair' required tooltip='This is a required field'>
          <PairsSelect landId={landId} onChange={handlePairsSelect} />
        </Form.Item>
        <Form.Item label='Amount' required tooltip='This is a required field'>
          <Input
            type='number'
            placeholder='input placeholder'
            suffix={`${token0?.symbol || ''}-${token1?.symbol || ''} LP`}
            disabled={!token0?.address || !token1?.address}
            onChange={(e) => {
              handleLiquidityOnChange(e);
            }}
            value={liquidyInputAmount}
          />
        </Form.Item>
        <Form.Item label='Receive' tooltip='This is a required field'>
          <span className='ant-form-text'>
            {getFullDisplayBalance(new BigNumber(get(info?.parsedAmounts, token0?.address)?.raw.toString() || '0'))} {token0?.symbol} + {getFullDisplayBalance(new BigNumber(get(info?.parsedAmounts, token1?.address)?.raw.toString() || '0'))} {token1?.symbol}
          </span>
        </Form.Item>
      </Form>
      <Button
        isLoading={handleUniswapRemoveLiquidityPendingTx || handleUniswapRemoveETHLiquidityPendingTx}
        onClick={() => {
          handleRemoveLiquidity();
        }}
      >
        Remove Liquidity
      </Button>
    </Box>
  );
};

export default RemoveLiquidity;
