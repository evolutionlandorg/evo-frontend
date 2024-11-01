// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import tw from 'twin.macro';
import { Pagination as AntdPagination, PaginationProps } from 'antd';

export interface Props extends BareProps, PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: any, size: any) => void;
}

const Pagination: React.FC<Props> = ({ className, current, total, pageSize, onChange, ...props }) => {
  if (!total) {
    return <></>;
  }

  return <AntdPagination className={`${className} Evo-pagination`} current={current} onChange={onChange} pageSize={pageSize} total={total} {...props} />;
};

export default styled(Pagination)`
  .ant-pagination-item {
    background-color: transparent;
    ${tw`rounded-lg border-none`}
  }

  .ant-pagination-prev button,
  .ant-pagination-next button {
    ${tw`leading-none rounded-lg`}
  }

  .ant-pagination-item-active {
    ${tw`border-solid border-white rounded-lg`}
  }
`;
