// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Select } from 'antd';
import { CompactToken } from '@evolutionland/evolution-js/lib/api/ethers';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { getPairs } from '../../liquidityConfig';

const { Option } = Select;

interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  onChange: (x: CompactToken[]) => void;
}

export const PairsSelect: React.FC<Props> = ({ className, landId, onChange, children, ...props }) => {
  const [pairs, setPairs] = useState<CompactToken[][]>([]);

  useEffect(() => {
    const liquidityPairs = getPairs(landId);
    setPairs(liquidityPairs);
  }, [landId]);

  function onSelectChange(value) {
    onChange(pairs[value]);
  }

  return (
    <Select
      className={className}
      showSearch
      style={{ width: 200 }}
      placeholder='Select a liquidity'
      optionFilterProp='children'
      onChange={onSelectChange}
      filterOption={(input, option) => {
        return option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
    >
      {pairs.map((pair, index) => {
        return (
          <Option key={`${pair[0]?.address}-${pair[1]?.address}`} value={index}>
            {pair[0]?.symbol}-{pair[1]?.symbol} LP
          </Option>
        );
      })}
    </Select>
  );
};
