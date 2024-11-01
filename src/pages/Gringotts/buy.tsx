// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback, useMemo } from 'react';
import { useBankBuyRING, useBankUniswapEthToTokenOutputPrice } from 'hooks/useBank';
import { useCurrentLand } from 'hooks/useRouterParams';
import { Button, Box } from 'components';
import { Form, Input, Radio } from 'antd';
import { parseUnits } from '@ethersproject/units';
import useToast from 'hooks/useToast';
import BigNumber from 'bignumber.js';
import debounce from 'lodash/debounce';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { LandConfig } from '@evolutionland/evolution-js';

interface Props {
  name?: string;
  className?: string;
}

const DEBOUNCE_DELAY = 1000;

const Buy: React.FC<Props> = ({ className }) => {
  const landId = useCurrentLand();
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  const [inputRINGValue, setInputRINGValue] = useState('');

  const inputRINGValueBn = new BigNumber(inputRINGValue || 0);
  const inputRINGValueString = parseUnits(inputRINGValueBn.toFixed(18), RING.decimals);

  const { price, pay } = useBankUniswapEthToTokenOutputPrice(landId, { address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'), decimals: 18 }, inputRINGValueString.toString());

  const { handleUniswapBuyRING, pendingTx } = useBankBuyRING(landId);
  const { toastSuccess, toastError } = useToast();

  const onChangeRINGAmount = useMemo(() => {
    return debounce((e) => {
      const { value } = e.target;
      setInputRINGValue(value);
    }, DEBOUNCE_DELAY);
  }, []);

  const handleBuyRING = useCallback(
    (input: string) => {
      if (!input) {
        toastError('The input content cannot be empty');
        return;
      }

      const inputBn = new BigNumber(input);
      const value = parseUnits(inputBn.toFixed(18));
      handleUniswapBuyRING(value);
    },
    [handleUniswapBuyRING, toastError]
  );

  return (
    <Box>
      <Form layout='vertical'>
        <Form.Item label='Amount' required tooltip='This is a required field'>
          <Input type='number' placeholder='input placeholder' suffix={RING.symbol} onChange={onChangeRINGAmount} />
        </Form.Item>
        <Form.Item label='Price' required tooltip='This is a required field'>
          <span className='ant-form-text'>{getFullDisplayBalance(price)}</span>
        </Form.Item>
        <Form.Item label='Total' required tooltip='This is a required field'>
          <span className='ant-form-text'>{getFullDisplayBalance(pay)}</span>
        </Form.Item>
      </Form>

      <Button
        isLoading={pendingTx}
        onClick={() => {
          handleBuyRING(inputRINGValue);
        }}
      >
        Buy RING test
      </Button>
    </Box>
  );
};

export default Buy;
