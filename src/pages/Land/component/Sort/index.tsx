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
  categoryValue?: string;
  onChangeOrderField?: (value: string) => void;
  orderFieldValue?: string;
  orderValue?: string;
  onChangeOrder?: (value: string) => void;
  disableSort?: boolean;
}

const SortFilterBox = styled(Flex)`
  ${tw`pb-4`}
`;

const SortSpaceBox = styled.div`
  ${tw`space-x-2`}
`;

const SortFilter: React.FC<Props> = ({ className, categoryOptions, onChangeCategoryFilter, categoryValue, orderFieldValue, onChangeOrderField, orderValue, onChangeOrder, disableSort }) => {
  const { t } = useTranslation();
  const { isMobile, isDesktop } = useMatchBreakpoints();
  const buttonSize = useMemo(() => (isDesktop ? 'middle' : 'small'), [isDesktop]);

  return (
    <SortFilterBox className={className} justifyContent='space-between' alignItems='center'>
      <Radio.Group size={buttonSize} options={categoryOptions} onChange={onChangeCategoryFilter} value={categoryValue} optionType='button' />
      {!disableSort && !isMobile && (
        <SortSpaceBox>
          <Select size={buttonSize} defaultValue={orderFieldValue} style={{ width: 120 }} onChange={onChangeOrderField}>
            <OptGroup label={t('Common')}>
              <Option value='price'>{t('land:Price')}</Option>
              <Option value='token_index'>{t('land:Token Index')}</Option>
            </OptGroup>
            <OptGroup label={t('Element')}>
              <Option value='gold_rate'>GOLD</Option>
              <Option value='wood_rate'>WOOD</Option>
              <Option value='water_rate'>WATER</Option>
              <Option value='fire_rate'>FIRE</Option>
              <Option value='soil_rate'>SOIL</Option>
            </OptGroup>
          </Select>
          <Select size={buttonSize} defaultValue={orderValue} style={{ width: 80 }} onChange={onChangeOrder}>
            <Option value='asc'>{t('ASC')}</Option>
            <Option value='desc'>{t('DESC')}</Option>
          </Select>
        </SortSpaceBox>
      )}
    </SortFilterBox>
  );
};

export default SortFilter;
