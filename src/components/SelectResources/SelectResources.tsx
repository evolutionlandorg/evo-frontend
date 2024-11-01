// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Select } from 'antd';
import { getTokenResourceList } from 'utils/tokenList';
import { SUPPORTED_LANDS_INDEX, Token } from 'types';

const { Option } = Select;

export interface Props extends BareProps {
  value: string;
  landId: SUPPORTED_LANDS_INDEX;
  chainId: number;
  onChange: (value: Token) => void;
  width?: number;
}

const StyledSelectResources = styled.div`
  align-items: center;
`;

const SelectResources: React.FC<Props> = ({ className, value, onChange, landId, width = '100%' }) => {
  const resources = useMemo(() => getTokenResourceList(landId), [landId]);

  const handleOnChange = useCallback(
    (_value) => {
      const selected = resources.find((resource) => resource.symbol === _value);
      if (selected) {
        onChange(selected);
      }
    },
    [resources, onChange]
  );

  return (
    <StyledSelectResources className={className}>
      <Select style={{ width }} value={value} onChange={handleOnChange}>
        {resources.map((resource) => {
          return (
            <Option key={resource.address} value={resource.symbol}>
              {resource.symbol}
            </Option>
          );
        })}
      </Select>
    </StyledSelectResources>
  );
};

export default SelectResources;
