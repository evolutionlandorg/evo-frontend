// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Radio, RadioChangeEvent } from 'antd';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface Props extends BareProps {
  items: TabItem[];
  basePath: string;
  url: string;
  onChange?: (e: RadioChangeEvent) => void;
}

const Tabs: React.FC<Props> = ({ items, className, basePath, url, onChange }) => {
  const history = useHistory();
  const { params } = useRouteMatch<{ type: string }>(`${basePath}/:type`) || { params: { type: (items && items[0].value) || '' } };

  const handleChange = (e: RadioChangeEvent) => {
    if (onChange) {
      onChange(e);
      return;
    }
    history.replace(`${url}/${e.target.value}`);
  };

  return (
    <Radio.Group value={params.type} className={className}>
      {items.map((item) => (
          <Radio.Button key={item.value} value={item.value} onChange={handleChange}>
            {item.label}
          </Radio.Button>
        ))}
    </Radio.Group>
  );
};

export default Tabs;
