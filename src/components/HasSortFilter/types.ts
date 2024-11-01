// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckboxOptionType } from 'antd';
import { OptionProps as AntdOptionsProps, SelectValue } from 'antd/lib/select';
import { History } from 'history';

export interface OptionProps extends Omit<AntdOptionsProps, 'children'> {
  label: string;
}
export type CategoryProps = OptionProps;

export interface CategoryGroupProps {
  groupName: string;
  options: CategoryProps[];
}

export type Categories = CategoryProps[] | CategoryGroupProps[];

export enum SearchParamKeys {
  OrderCategory = 'orderCategory',
  Order = 'order',
  Filter = 'filter'
}

// TODO: Abstraction with generics
interface OnlyCategories {
  categories?: CategoryProps[];
  categoryGroups?: never;
}

interface OnlyCategoryGroups {
  categoryGroups?: CategoryGroupProps[];
  categories?: never;
}

type OptionsProps = NonNullable<OnlyCategories | OnlyCategoryGroups>;

export type HasSortFilterProps = OptionsProps & {
  sortable?: boolean;
  searchUpdatable?: boolean;
  url?: string;
  search?: URLSearchParams;
  history?: History;
  sortOptions?: OptionProps[];
  filterOptions: Array<CheckboxOptionType | string>;
  onFilterChange?: (value: string | any) => void;
  onOrderChange?: (value: SelectValue) => void;
  onOrderCategoryChange?: (value: SelectValue) => void;
};
