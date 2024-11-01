// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Flex } from 'components/Box';
import { Radio, RadioChangeEvent, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { SelectValue } from 'antd/lib/select';
import _ from 'lodash';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';
import { CategoryGroupProps, CategoryProps, OptionProps, HasSortFilterProps, SearchParamKeys } from './types';

const SortWrapper = styled(Flex)`
  ${tw`pb-4`}
`;

const SortSpacer = styled.div`
  ${tw`space-x-2`}
`;

const SortSelect = styled(Select)`
  width: 130px;
`;

const { Option, OptGroup } = Select;

function renderOptions(options: CategoryProps[]) {
  return options.map(({ label, value }) => (
    <Option value={value} key={value}>
      {label}
    </Option>
  ));
}

function renderCategories(categories: CategoryGroupProps[]) {
  return categories.map(({ groupName, options }) => (
    <OptGroup key={groupName} label={groupName}>
      {renderOptions(options)}
    </OptGroup>
  ));
}

const HasSortFilter: FC<HasSortFilterProps> = ({ categories, categoryGroups, sortOptions, sortable, filterOptions, searchUpdatable = true, url, search = new URLSearchParams(), history, onFilterChange, onOrderChange, onOrderCategoryChange }) => {
  const { t } = useTranslation();
  const { isMobile, isDesktop } = useMatchBreakpoints();
  const buttonSize = useMemo(() => (isDesktop ? 'middle' : 'small'), [isDesktop]);

  const updateSearch = () => {
    if (!searchUpdatable) {
      return;
    }
    history.push({ pathname: url, search: `?${search}` });
  };

  const [filterValue, setFilterValue] = useState(() => {
    if (search.has(SearchParamKeys.Filter)) {
      return search.get(SearchParamKeys.Filter);
    }

    const first = filterOptions[0];
    return _.isString(first) ? first : first.value;
  });
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filterValue);
    }
  }, [filterValue, onFilterChange]);
  function onFilterChangeHandle(e: RadioChangeEvent) {
    const { value } = e.target;

    search.set(SearchParamKeys.Filter, value);
    updateSearch();
    setFilterValue(value);
  }

  const [category, setCategory] = useState(() => {
    if (search.has(SearchParamKeys.OrderCategory)) {
      return search.get(SearchParamKeys.OrderCategory);
    }

    if (categories) {
      return categories[0].value;
    }

    if (categoryGroups) {
      return categoryGroups[0].options[0].value;
    }

    return '';
  });
  useEffect(() => {
    if (onOrderCategoryChange) {
      onOrderCategoryChange(category);
    }
  }, [category, onOrderCategoryChange]);
  function onCategoryChange(value: SelectValue) {
    search.set(SearchParamKeys.OrderCategory, value.toString());
    updateSearch();
    setCategory(value);
  }

  const defaultOrders: OptionProps[] = useMemo(
    () => [
      {
        label: t('DEFAULT'),
        value: ''
      },
      {
        label: t('ASC'),
        value: 'asc'
      },
      {
        label: t('DESC'),
        value: 'desc'
      }
    ],
    [t]
  );
  const [order, setOrder] = useState(() => {
    if (search.has(SearchParamKeys.Order)) {
      return search.get(SearchParamKeys.Order);
    }

    return (sortOptions || defaultOrders)[0].value;
  });
  useEffect(() => {
    if (onOrderChange) {
      onOrderChange(order);
    }
  }, [order, onOrderChange]);
  const onOrderChangeHandle = (value: SelectValue) => {
    search.set(SearchParamKeys.Order, value.toString());
    updateSearch();
    setOrder(value);
  };

  return (
    <SortWrapper justifyContent='space-between' alignItems='center'>
      <Radio.Group size={buttonSize} options={filterOptions} onChange={onFilterChangeHandle} value={filterValue} optionType='button' />
      {!isMobile && sortable && (
        <SortSpacer>
          <SortSelect size={buttonSize} defaultValue={category} onChange={onCategoryChange}>
            {categories && renderOptions(categories)}
            {categoryGroups && renderCategories(categoryGroups)}
          </SortSelect>
          <SortSelect size={buttonSize} defaultValue={order} onChange={onOrderChangeHandle}>
            {renderOptions(sortOptions || defaultOrders)}
          </SortSelect>
        </SortSpacer>
      )}
    </SortWrapper>
  );
};

export default HasSortFilter;
