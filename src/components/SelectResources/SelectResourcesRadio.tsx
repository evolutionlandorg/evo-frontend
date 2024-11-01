// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Form, Radio } from 'antd';
import { getTokenResourceList } from 'utils/tokenList';
import { SUPPORTED_LANDS_INDEX, Token } from 'types';
import { useTranslation } from 'react-i18next';

export interface Props extends BareProps {
  value: string;
  landId: SUPPORTED_LANDS_INDEX;
  chainId: number;
  onChange: (value: Token) => void;
}

const StyledSelectResources = styled.div`
  align-items: center;
`;

const SelectResources: React.FC<Props> = ({ className, value, onChange, landId }) => {
  const { t } = useTranslation();
  const resources = useMemo(() => getTokenResourceList(landId), [landId]);

  const handleOnChange = useCallback(
    (e) => {
      const selected = resources.find((resource) => resource.symbol === e.target.value);
      if (selected) {
        onChange(selected);
      }
    },
    [resources, onChange]
  );

  return (
    <StyledSelectResources className={className}>
      <Form layout='vertical'>
        <Form.Item label={t('Select Resource Preference')} required>
          <Radio.Group optionType='button' buttonStyle='solid' value={value} onChange={handleOnChange}>
            {resources.map((resource) => {
              return (
                <Radio.Button key={resource.address} value={resource.symbol}>
                  {resource.symbol}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Form.Item>
      </Form>
    </StyledSelectResources>
  );
};

export default SelectResources;
