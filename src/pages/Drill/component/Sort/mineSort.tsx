// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BareProps } from 'components/types';
import { Flex } from 'components';
import { Select, Radio, CheckboxOptionType, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';

const { Option, OptGroup } = Select;

export interface Props extends BareProps {
  categoryOptions: (string | CheckboxOptionType)[];
  onChangeCategoryFilter: (e: RadioChangeEvent) => void;
  categoryValue: string;
  onChangeOrderField: (value: string) => void;
  orderFieldValue: string;
  orderValue: string;
  onChangeOrder: (value: string) => void;
}

const SortFilterBox = styled(Flex)`
  ${tw`pb-4`}
`;

const SortSpaceBox = styled.div`
  ${tw`space-x-2`}
`;

const SortFilter: React.FC<Props> = ({ className, categoryOptions, onChangeCategoryFilter, categoryValue, orderFieldValue, onChangeOrderField, orderValue, onChangeOrder }) => {
  const { t } = useTranslation();
  const { isMobile, isDesktop } = useMatchBreakpoints();
  const buttonSize = useMemo(() => (isDesktop ? 'middle' : 'small'), [isDesktop]);

  return (
    <SortFilterBox className={className} justifyContent='space-between' alignItems='center'>
      <Radio.Group options={categoryOptions} onChange={onChangeCategoryFilter} value={categoryValue} optionType='button' />
      {!isMobile && (
        <SortSpaceBox>
          <Select size={buttonSize} defaultValue={orderFieldValue} style={{ width: 130 }} onChange={onChangeOrderField}>
            <OptGroup label='Common'>
              <Option value='time'>{t('sort_Time')}</Option>
              <Option value='id'>{t('sort_Id')}</Option>
              <Option value='gen'>{t('sort_Gen')}</Option>
            </OptGroup>
          </Select>
          <Select size={buttonSize} defaultValue={orderValue} style={{ width: 130 }} onChange={onChangeOrder}>
            <Option value='asc'>{t('ASC')}</Option>
            <Option value='desc'>{t('DESC')}</Option>
          </Select>
        </SortSpaceBox>
      )}
    </SortFilterBox>
  );
};

export default SortFilter;
